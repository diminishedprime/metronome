import React from "react";

export interface SubDivision {
  on: boolean;
  pitch: number;
  divisions: number;
  label: string;
  gain: number;
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

export interface Beat {
  time: number;
  pitch: number;
  gain: number;
  buffer: AudioBuffer;
  divisions: Divisions;
  idx: number;
}

export interface Signature {
  numerator: number;
  denominator: number;
  beats: Array<SignatureBeat>;
}

export interface Division {
  gain: number;
  pitch: number;
  divisions: Divisions;
  current: number | undefined;
}

export interface SignatureBeat {
  divisions: Array<Divisions>;
}

// TODO(mjhamrick) - If i find those types for time, beatTime, and the number[] should both be time.
export type Divisions = 1 | 2 | 3 | 4 | 5 | 6;
// Numbers aren't right, but this is the idea.
// [[1, [3.0]], [2, [3.0, 3.45]], [3, [3.0, 3.3, 3.9]]]
export type NextBeatDivisions = Array<Divisions>;

export interface State {
  bpm: number;
  playing: boolean;
  currentBeat?: SignatureBeat;
  nextBeatDivisions?: NextBeatDivisions;
  signature: Signature;
  activeSubDivisions: Division[][];
}

export interface Metronome {
  start: (bpm?: number) => void;
  stop: () => void;
  setBPM: React.Dispatch<React.SetStateAction<number>>;
  state: State;
}
