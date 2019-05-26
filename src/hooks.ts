import {
  useState,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef
} from "react";
import * as R from "ramda";
import * as d from "deep-object-diff";
import * as t from "./types";
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

export const useSleepLock = () => {
  const [noSleep] = useState(new NoSleep());

  const lock = useCallback(() => {
    noSleep.enable();
  }, [noSleep]);

  const release = useCallback(() => {
    noSleep.disable();
  }, [noSleep]);

  return {
    lock,
    release
  };
};

// TODO - add in some logic to do simple migrations. Otherwise, we get stuck
// with this state forever and have to blow it away.
export const useLocalStorage = <T>(
  key: t.LocalStorageKey,
  initialValue: T | (() => T),
  override: boolean = false
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    let firstValue;
    const fromLocal = localStorage.getItem(key);
    if (fromLocal !== null && fromLocal !== undefined && !override) {
      firstValue = JSON.parse(fromLocal);
    } else {
      firstValue =
        initialValue instanceof Function ? initialValue() : initialValue;
    }
    window.localStorage.setItem(key, JSON.stringify(firstValue));
    return firstValue;
  });

  const setNewValue: Dispatch<SetStateAction<T>> = useCallback(
    (valueAction: SetStateAction<T>) => {
      setValue((oldValue: T) => {
        const newValue =
          valueAction instanceof Function ? valueAction(oldValue) : valueAction;
        window.localStorage.setItem(key, JSON.stringify(newValue));
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
  audioContext: AudioContext | undefined,
  url: string
): AudioBuffer | undefined => {
  const [buffer, updateBuffer] = useState<AudioBuffer>();
  useEffect(() => {
    if (audioContext !== undefined) {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(updateBuffer);
    }
  }, [url, audioContext]);
  return buffer;
};
