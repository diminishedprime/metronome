import React, {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from "react";
import * as R from "ramda";
import * as d from "deep-object-diff";
import * as polyfill from "./polyfill";
import * as t from "./types";
import * as transit from "transit-immutable-js";
import NoSleep from "nosleep.js";

export const useSingleton = <T>(initialValue?: T) => {
  const [value, setValue] = useState<T | undefined>(initialValue);

  const setValueOnce = useCallback(
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
  const [noSleep] = useState(new NoSleep());

  React.useEffect(() => {
    if (shouldSleep) {
      console.log("enabling sleep");
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
  const [value, setValue] = useState(() => {
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

  const setNewValue: Dispatch<SetStateAction<T>> = useCallback(
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
  const toggle = useCallback(() => {
    setStorageValue(R.not);
  }, [setStorageValue]);
  return [storageValue, toggle];
};

export const useToggle = (
  initialValue: boolean,
  sideEffect = (toggleState: boolean) => {}
): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggle = useCallback(
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
  const newSetter = useCallback(
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
  const oldValues = useRef<any[]>(values);

  useEffect(() => {
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
  const [buffer, updateBuffer] = useState<AudioBuffer>();
  useEffect(() => {
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
    AudioContext | "not-supported" | "pending" | undefined
  >();
  const audioContextRef = React.useRef<AudioContext>();
  const [hasFixed, setHasFixed] = React.useState(false);

  const fixAudioContext = useCallback(() => {
    if (!hasFixed) {
      if (audioContextRef.current !== undefined) {
        setAudioContext("pending");
        audioContextRef.current.resume().then(() => {
          setHasFixed(true);
          setAudioContext(audioContextRef.current);
          document.removeEventListener("touchstart", fixAudioContext);
          document.removeEventListener("click", fixAudioContext);
          document.removeEventListener("touchend", fixAudioContext);
        });
      }
    }
  }, [hasFixed, setHasFixed]);

  React.useEffect(() => {
    if (polyfill.AudioContext === undefined) {
      setAudioContext("not-supported");
    } else {
      const context = new polyfill.AudioContext();
      audioContextRef.current = context;
      if (context.state === "suspended") {
        document.addEventListener("touchstart", fixAudioContext);
        document.addEventListener("click", fixAudioContext);
        document.addEventListener("touchend", fixAudioContext);
      } else {
        setAudioContext(context);
      }
    }
  }, [fixAudioContext]);

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
