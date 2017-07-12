const asyncConst = (val) => `async ${val}`

export const STOP_METRONOME = asyncConst('stop metronome')
export const afStopMetronome = () => ({type: STOP_METRONOME})

export const START_METRONOME = asyncConst('start metronome')
export const afStartMetronome = () => ({type: START_METRONOME})

export const SET_PLAYING = 'set playing'
export const afSetPlaying = (flag) => ({type: SET_PLAYING, flag})

export const ADD_BPM = 'add bpm'
export const afAddBPM = (amount) => ({type: ADD_BPM, amount})

export const TAP_IN = asyncConst('tap in')
export const afTapIn = () => ({type: TAP_IN})

export const SET_BPM = 'set bpm'
export const afSetBPM = (bpm) => ({type: SET_BPM, bpm})

export const SET_BUFFER = 'set buffer'
export const afSetBuffer = (bufferName, buffer) => ({type: SET_BUFFER, buffer, bufferName})

export const SET_VOLUME = 'set volume'
export const afSetVolume = (path, value) => ({
  type: SET_VOLUME,
  path,
  value,
})

export const SET_BEATS_PER_BAR = 'set beats per bar'
export const afSetBeatsPerBar = (beatsPerBar) => ({
  type: SET_BEATS_PER_BAR,
  beatsPerBar,
})

export const SET_BEAT = 'set beat'
export const afSetBeat = (beat) => ({
  type: SET_BEATS_PER_BAR,
  beat,
})
