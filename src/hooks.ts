import { useState, Dispatch, SetStateAction } from "react";

export const useLocalStorage = <T>(
  key: string,
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

  const setNewValue: Dispatch<SetStateAction<T>> = (
    valueAction: SetStateAction<T>
  ) => {
    setValue((oldValue: T) => {
      const newValue =
        valueAction instanceof Function ? valueAction(oldValue) : valueAction;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      return newValue;
    });
  };

  return [value, setNewValue];
};

export const useToggle = (initialValue: boolean): [boolean, () => void] => {
  const [value, setValue] = useState(initialValue);
  const toggle = () => setValue((old: boolean) => !old);
  return [value, toggle];
};
