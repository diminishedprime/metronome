const asyncConst = (val) => `async ${val}`

export const STOP_METRONOME = asyncConst('stop metronome')
export const afStopMetronome = () => ({type: STOP_METRONOME})

export const START_METRONOME = asyncConst('start metronome')
export const afStartMetronome = () => ({type: START_METRONOME})

export const SET_PLAYING = 'set playing'
export const afSetPlaying = (flag) => ({type: SET_PLAYING, flag})

export const ADD_BPM = 'add bpm'
export const afAddBPM = (amount) => ({type: ADD_BPM, amount})
