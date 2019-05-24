export function assertNever(value: never): never {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
}

export const runAtTime = (
  audioContext: AudioContext,
  timeToRun: number,
  callback: () => void
) => {
  const now = audioContext.currentTime;
  if (timeToRun <= now) {
    callback();
  } else {
    const sleepTime = ((timeToRun - now) / 2) * 1000;
    setTimeout(() => runAtTime(audioContext, timeToRun, callback), sleepTime);
  }
};
