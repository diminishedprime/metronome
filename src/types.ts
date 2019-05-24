import React from "react";

export enum LocalStorageKey {
  SignatureDivisions = "@mjh/k/signature-divisions-3",
  ShowKnown = "@mjh/k/show-known-2",
  ScalesDB = "@mjh/k/scales-db-1",
  ActiveBeats = "@mjh/k/active-beats-2",
  TimeSignature = "@mjh/k/signature-2",
  BPM = "@mjh/k/bpm-0",
  KnownScales = "@mjh/k/known-scales-0",
  ShowScales = "@mjh/k/show-scales-0",
  ShowTuner = "@mjh/k/show-tuner-0",
  ShowDial = "@mjh/k/show-dial-0",
  Radians = "@mjh/k/radians-0"
}

export enum Mode {
  Major = "Major",
  Minor = "Minor"
}

export enum Pitch {
  A = "A",
  B = "B",
  C = "C",
  D = "D",
  E = "E",
  F = "F",
  G = "G",

  A_Flat = "Ab",
  B_Flat = "Bb",
  C_Flat = "Cb",
  D_Flat = "Db",
  E_Flat = "Eb",
  F_Flat = "Fb",
  G_Flat = "Gb",

  A_Sharp = "A#",
  B_Sharp = "B#",
  C_Sharp = "C#",
  D_Sharp = "D#",
  E_Sharp = "E#",
  F_Sharp = "F#",
  G_Sharp = "G#"
}

// TODO - this seems promising to be able to iterate through all options, just need to add them all in.
export type ScaleKey =
  // First The naturals
  | [Pitch.A, Mode.Major]
  | [Pitch.B, Mode.Major]
  | [Pitch.C, Mode.Major]
  | [Pitch.D, Mode.Major]
  | [Pitch.E, Mode.Major]
  | [Pitch.F, Mode.Major]
  | [Pitch.G, Mode.Major]
  // Now The Flats
  | [Pitch.A_Flat, Mode.Major]
  | [Pitch.B_Flat, Mode.Major]
  | [Pitch.C_Flat, Mode.Major]
  | [Pitch.D_Flat, Mode.Major]
  | [Pitch.E_Flat, Mode.Major]
  | [Pitch.G_Flat, Mode.Major]
  // The sharps
  | [Pitch.C_Sharp, Mode.Major]
  | [Pitch.D_Sharp, Mode.Major]
  | [Pitch.E_Sharp, Mode.Major]
  | [Pitch.F_Sharp, Mode.Major]
  // Now The Minors
  | [Pitch.A, Mode.Minor]
  | [Pitch.B, Mode.Minor]
  | [Pitch.C, Mode.Minor]
  | [Pitch.D, Mode.Minor]
  | [Pitch.E, Mode.Minor]
  | [Pitch.F, Mode.Minor]
  | [Pitch.G, Mode.Minor]
  // Flat
  | [Pitch.A_Flat, Mode.Minor]
  | [Pitch.B_Flat, Mode.Minor]
  | [Pitch.E_Flat, Mode.Minor]
  // Sharp
  | [Pitch.A_Sharp, Mode.Minor]
  | [Pitch.C_Sharp, Mode.Minor]
  | [Pitch.D_Sharp, Mode.Minor]
  | [Pitch.F_Sharp, Mode.Minor]
  | [Pitch.G_Sharp, Mode.Minor];

// It's easy to forget one of these, so be careful, I guess. I couldn't figure
// out a good way to do this, but this definitely works. I just copy the thing at the top and replace | with ,
export const scaleKeys: ScaleKey[] = [
  // First The naturals
  [Pitch.A, Mode.Major],
  [Pitch.B, Mode.Major],
  [Pitch.C, Mode.Major],
  [Pitch.D, Mode.Major],
  [Pitch.E, Mode.Major],
  [Pitch.F, Mode.Major],
  [Pitch.G, Mode.Major],
  // Now The Flats
  [Pitch.A_Flat, Mode.Major],
  [Pitch.B_Flat, Mode.Major],
  [Pitch.C_Flat, Mode.Major],
  [Pitch.D_Flat, Mode.Major],
  [Pitch.E_Flat, Mode.Major],
  [Pitch.G_Flat, Mode.Major],
  // The sharps
  [Pitch.C_Sharp, Mode.Major],
  [Pitch.F_Sharp, Mode.Major],
  // Now The Minors
  [Pitch.A, Mode.Minor],
  [Pitch.B, Mode.Minor],
  [Pitch.C, Mode.Minor],
  [Pitch.D, Mode.Minor],
  [Pitch.E, Mode.Minor],
  [Pitch.F, Mode.Minor],
  [Pitch.G, Mode.Minor],
  // Flat
  [Pitch.A_Flat, Mode.Minor],
  [Pitch.B_Flat, Mode.Minor],
  [Pitch.E_Flat, Mode.Minor],
  // Sharp
  [Pitch.A_Sharp, Mode.Minor],
  [Pitch.C_Sharp, Mode.Minor],
  [Pitch.D_Sharp, Mode.Minor],
  [Pitch.F_Sharp, Mode.Minor],
  [Pitch.G_Sharp, Mode.Minor]
];

export interface Scale {
  scaleKey: ScaleKey;
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
  divisions: Division;
  divisionIndex: number;
  currentBeat: number;
}

export type Division = 1 | 2 | 3 | 4 | 5 | 6;

export type ActiveDivisions = {
  [divisionOption: number]: number | undefined;
};
export type EnabledDivisions = {
  [divisionOption: number]: boolean;
};

export interface TimeSignature {
  denominator: number;
  numerator: EnabledDivisions[];
}

export interface State {
  bpm: number;
  playing: boolean;
  signature: TimeSignature;
  activeDivisions: Array<ActiveDivisions>;
}

export interface Metronome {
  toggleStart: () => void;
  start: (bpm?: number) => void;
  stop: () => void;
  setBPM: React.Dispatch<React.SetStateAction<number>>;
  setSignature: React.Dispatch<React.SetStateAction<TimeSignature>>;
  addBPM: (bpmToAdd: number) => void;
  state: State;
}
