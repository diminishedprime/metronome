export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

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
