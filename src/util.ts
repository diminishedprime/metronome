import * as t from "./types";
import * as transit from "transit-immutable-js";

export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

// TODO - I might be able to overload this so it's actually typesafe by making
// the return type dependant on a key literal.
export const fromLocalStorage = <T>(
  key: t.LocalStorageKey,
  defaultValue: T
): T => {
  const fromLocal = localStorage.getItem(key);
  if (fromLocal === null) {
    return defaultValue;
  } else {
    return transit.fromJSON(fromLocal);
  }
};

export const toLocalStorage = <T>(key: t.LocalStorageKey, value: T) => {
  localStorage.setItem(key, transit.toJSON(value));
};

export const shuffle = <T>(a: Array<T>) => {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const runAtTime = (
  audioContext: AudioContext,
  timeToRun: number,
  callback: () => void
) => {
  // const now = audioContext.currentTime;
  // if (timeToRun <= now) {
  //   callback();
  // } else {
  //   const sleepTime = ((timeToRun - now) / 2) * 1000;
  //   setTimeout(() => runAtTime(audioContext, timeToRun, callback), sleepTime);
  // }
  setTimeout(callback, (timeToRun - audioContext.currentTime) * 1000);
};
