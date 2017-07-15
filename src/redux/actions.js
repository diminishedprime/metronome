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

export const SET_VOLUME = 'set volume'
export const afSetVolume = (path, value) => ({
  type: SET_VOLUME,
  path,
  value,
})

export const SET_BEAT = 'set beat'
export const afSetBeat = (beat) => ({
  type: SET_BEAT,
  beat,
})

export const SHOW_TIME_SIGNATURE_SETTINGS = 'show time signature settings'
export const afShowTimeSignatureSettings = (flag) => ({
  type: SHOW_TIME_SIGNATURE_SETTINGS,
  flag,
})

export const CHANGE_STYLE = 'change style'
export const afChangeStyle = (delta) => ({
  type: CHANGE_STYLE,
  delta,
})

export const NEXT_BEAT_GROUP = 'next beat group'
export const afNextBeatGroup = () => ({
  type: NEXT_BEAT_GROUP,
})
