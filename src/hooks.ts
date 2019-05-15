import { useState, Dispatch, SetStateAction } from "react";

export const useLocalStorage = <T>(
  key: string,
  initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] => {
  const [value, setValue] = useState(() => {
    let firstValue;
    const fromLocal = localStorage.getItem(key);
    if (fromLocal !== null) {
      firstValue = JSON.parse(fromLocal);
    } else {
      firstValue =
        initialValue instanceof Function ? initialValue() : initialValue;
    }
    window.localStorage.setItem(key, JSON.stringify(firstValue));
    return firstValue;
  });

  const setNewValue: Dispatch<SetStateAction<T>> = (
    valueAction: SetStateAction<T>
  ) => {
    const newValue =
      valueAction instanceof Function ? valueAction(value) : valueAction;
    setValue(newValue);
    window.localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setNewValue];
};
