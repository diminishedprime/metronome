export interface SubDivision {
  on: boolean;
  pitch: number;
  divisions: number;
  label: string;
  gain: number;
}

export interface Signature {
  numerator: number;
  denominator: number;
}

export interface SchedulerState {
  bpm: number;
  subDivisions: Array<SubDivision>;
  signature: Signature;
  audioContext: AudioContext;
}

export interface Beat {
  time: number;
  pitch: number;
  gain: number;
  buffer: AudioBuffer;
}
