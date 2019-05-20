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
  subDivisionOverrides: Array<Array<SubDivision>>;
  subDivisions: Array<SubDivision>;
}

export interface SchedulerState {
  bpm: number;
  signature: Signature;
  scheduleAhead: number;
}

export interface Beat {
  time: number;
  pitch: number;
  gain: number;
  buffer: AudioBuffer;
}

export enum Mode {
  Major = "Major",
  Minor = "Minor"
}

export enum Pitch {
  A = "A",
  B_Flat = "Bb",
  B = "B",
  C = "C",
  D_Flat = "Db",
  D = "D",
  E_Flat = "Eb",
  E = "E",
  F = "F",
  G_Flat = "Gb",
  G = "G",
  A_Flat = "Ab"
}

export interface Scale {
  mode: Mode;
  pitch: Pitch;
  known: boolean;
  learning: boolean;
  bpm: number;
}

export type ScalesDB = {
  [pitch: string]: {
    [mode: string]: Scale;
  };
}; // Map<Pitch, Map<Mode, Scale>>;
