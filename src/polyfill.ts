interface Constructable<T> {
  new (): T;
}

export const AudioContext: Constructable<AudioContext> | undefined =
  (window as any).AudioContext || // Default
  (window as any).webkitAudioContext || // Safari and old versions of Chrome
  undefined;
