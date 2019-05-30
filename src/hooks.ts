import React, { Dispatch, SetStateAction } from "react";
import * as R from "ramda";
import * as d from "deep-object-diff";
import * as polyfill from "./polyfill";
import * as t from "./types";
import * as transit from "transit-immutable-js";
import NoSleep from "nosleep.js";

export const useSingleton = <T>(initialValue?: T) => {
  const [value, setValue] = React.useState<T | undefined>(initialValue);

  const setValueOnce = React.useCallback(
    (t: T) => {
      if (!value) {
        setValue(t);
      }
    },
    [value]
  );

  return {
    value: value,
    init: setValueOnce
  };
};

export const useSleepLock = (shouldSleep: boolean) => {
  const [noSleep] = React.useState(new NoSleep());

  React.useEffect(() => {
    if (shouldSleep) {
      noSleep.enable();
    } else {
      noSleep.disable();
    }
  }, [shouldSleep, noSleep]);
};

// TODO: - add in some logic to do simple migrations. Otherwise, we get stuck
// with this state forever and have to blow it away.
export const useLocalStorage = <T>(
  key: t.LocalStorageKey,
  initialValue: T | (() => T),
  override: boolean = false
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = React.useState(() => {
    let firstValue: T;
    const fromLocal = localStorage.getItem(key);
    if (fromLocal !== null && fromLocal !== undefined && !override) {
      firstValue = transit.fromJSON(fromLocal);
    } else {
      firstValue =
        initialValue instanceof Function ? initialValue() : initialValue;
    }
    window.localStorage.setItem(key, transit.toJSON(firstValue));
    return firstValue;
  });

  const setNewValue: Dispatch<SetStateAction<T>> = React.useCallback(
    (valueAction: SetStateAction<T>) => {
      setValue((oldValue: T) => {
        const newValue =
          valueAction instanceof Function ? valueAction(oldValue) : valueAction;
        window.localStorage.setItem(key, transit.toJSON(newValue));
        return newValue;
      });
    },
    [key]
  );
  return [value, setNewValue];
};

export const usePersistantToggle = (
  key: t.LocalStorageKey,
  initialValue: boolean
): [boolean, () => void] => {
  const [storageValue, setStorageValue] = useLocalStorage(key, initialValue);
  const toggle = React.useCallback(() => {
    setStorageValue(R.not);
  }, [setStorageValue]);
  return [storageValue, toggle];
};

export const useToggle = (
  initialValue: boolean,
  sideEffect = (toggleState: boolean) => {}
): [boolean, () => void] => {
  const [value, setValue] = React.useState(initialValue);
  const toggle = React.useCallback(
    () =>
      setValue((old: boolean) => {
        const newValue = !old;
        sideEffect(newValue);
        return newValue;
      }),
    [sideEffect]
  );
  return [value, toggle];
};

export const useAdvice = <T>(
  [originalT, originalSetter]: [T, React.Dispatch<React.SetStateAction<T>>],
  advice: (t: T) => T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const newSetter = React.useCallback(
    (action: React.SetStateAction<T>) => {
      originalSetter(oldT =>
        advice(action instanceof Function ? action(oldT) : action)
      );
    },
    [advice, originalSetter]
  );
  useDetectChangedValue(advice, originalSetter);
  return [originalT, newSetter];
};

export const useDetectChangedValue = (...values: any[]) => {
  const oldValues = React.useRef<any[]>(values);

  React.useEffect(() => {
    const lastValues = oldValues.current;
    const newValues = values;
    lastValues.forEach((lastValue: any, index: number) => {
      const newValue = newValues[index];
      if (newValue !== lastValue) {
        const diff = d.detailedDiff(lastValue, newValue);
        console.log(`Change at argument index: ${index}`, diff);
      }
    });
    oldValues.current = values;
  }, [values]);
};

export const useAudioBuffer = (
  audioContext: t.MAudioContext,
  url: string
): AudioBuffer | undefined => {
  const [buffer, updateBuffer] = React.useState<AudioBuffer>();
  React.useEffect(() => {
    if (
      // TODO: - refactor this out into a helper method if possible.
      audioContext !== undefined &&
      audioContext !== "not-supported" &&
      audioContext !== "pending"
    ) {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(updateBuffer);
    }
  }, [url, audioContext]);
  return buffer;
};

export const useAudioContext = ():
  | AudioContext
  | undefined
  | "pending"
  | "not-supported" => {
  const [audioContext, setAudioContext] = React.useState<
    AudioContext | "not-supported" | "pending"
  >("pending");
  const [hasFixed, setHasFixed] = React.useState(false);

  React.useEffect(() => {
    if (polyfill.AudioContext === undefined) {
      setAudioContext("not-supported");
    } else {
      const context = new polyfill.AudioContext();
      const fixAudioContext = () => {
        if (!hasFixed) {
          setAudioContext("pending");
          context.resume().then(() => {
            const firstGain = context.createGain();
            firstGain.gain.value = 0.01;
            const firstNote = context.createOscillator();
            firstNote.type = "sine";
            firstNote.frequency.value = 440;
            firstNote.connect(firstGain);
            firstGain.connect(context.destination);

            const secondGain = context.createGain();
            secondGain.gain.value = 0.01;
            const secondNote = context.createOscillator();
            secondNote.type = "sine";
            secondNote.frequency.value = 554;
            secondNote.connect(secondGain);
            secondGain.connect(context.destination);

            const thirdGain = context.createGain();
            thirdGain.gain.value = 0.01;
            const thirdNote = context.createOscillator();
            thirdNote.type = "sine";
            thirdNote.frequency.value = 659;
            thirdNote.connect(thirdGain);
            thirdGain.connect(context.destination);

            const noteOffset = 0.025;

            const first = context.currentTime + 0.1;
            const second = first + noteOffset;
            const third = second + noteOffset;
            const end = third + noteOffset;

            firstNote.start(first);
            firstNote.stop(second);

            secondNote.start(second);
            secondNote.stop(third);

            thirdNote.start(third);
            thirdNote.stop(end);

            setHasFixed(true);
            setAudioContext(context);
            document.removeEventListener("touchstart", fixAudioContext);
            document.removeEventListener("click", fixAudioContext);
            document.removeEventListener("touchend", fixAudioContext);
          });
        }
      };
      document.addEventListener("touchstart", fixAudioContext);
      document.addEventListener("click", fixAudioContext);
      document.addEventListener("touchend", fixAudioContext);
    }
  }, []);

  return audioContext;
};

export const useAnimationFrameDebounce = <T>(value: T) => {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  const valueRef = React.useRef<T>(value);

  React.useEffect(() => {
    valueRef.current = value;
  }, [value]);

  React.useEffect(() => {
    let animationFrame = -1;

    const tick = () => {
      loop();
      setDebouncedValue(valueRef.current);
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(tick);
    };
    loop();

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return debouncedValue;
};
