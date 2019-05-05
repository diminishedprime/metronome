export interface SubDivision {
  on: boolean
  pitch: number
  divisions: number
  label: string
}

export interface SubDivisions {
  _2: SubDivision
  _3: SubDivision
  _4: SubDivision
  _5: SubDivision
  _6: SubDivision
  _7: SubDivision
  _8: SubDivision
}

export interface Signature {
  numerator: number
  denominator: number
}

export interface SchedulerState {
  bpm: number
  scheduleAheadTimeSeconds: number
  subDivisions: SubDivisions
  signature: Signature
}

export interface Beat {
  time: number
  pitch: number
}
