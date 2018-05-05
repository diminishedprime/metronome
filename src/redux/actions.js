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

export const SET_STYLE = 'set style'
export const afSetStyle = (index) => ({
  type: SET_STYLE,
  index,
})

export const CHANGE_STYLE = 'change style'
export const afChangeStyle = (delta) => ({
  type: CHANGE_STYLE,
  delta,
})

export const SET_BEAT_GROUP = 'set beat group'
export const afSetBeatGroup = (index) => ({
  type: SET_BEAT_GROUP,
  index,
})

export const NEXT_BEAT_GROUP = 'next beat group'
export const afNextBeatGroup = () => ({
  type: NEXT_BEAT_GROUP,
})

export const SET_EDITING_BPM = 'set editing bpm'
export const afSetEditingBPM = (flag) => ({
  type: SET_EDITING_BPM,
  flag,
})

export const KEY_FOR_UP = 'async key for up'
export const afKeyForUp = () => ({
  type: KEY_FOR_UP,
})

export const KEY_FOR_DOWN = 'async key for down'
export const afKeyForDown = () => ({
  type: KEY_FOR_DOWN,
})

export const KEY_FOR_START = 'async key for start'
export const afKeyForStart = () => ({
  type: KEY_FOR_START,
})

export const TOGGLE_MUTE = 'toggle mute'
export const afToggleMute = (path) => ({
  type: TOGGLE_MUTE,
  path,
})

export const NEW_CONTENT_AVAILABLE = 'new content available'
export const afNewContentAvailable = () => ({
  type: NEW_CONTENT_AVAILABLE,
})

export const TOGGLE_VOLUME_CONTROL = 'set show volume control'
export const afToggleVolumeControl = (toggle) => ({
  type: TOGGLE_VOLUME_CONTROL,
  toggle,
})

export const TOGGLE_WHEEL_CONTROL = 'set show wheel control'
export const afToggleWheelControl = (toggle) => ({
  type: TOGGLE_WHEEL_CONTROL,
  toggle,
})

export const SET_BEAT_LENGTH = ' set beat length'
export const afSetBeatLength = (beatLength) => ({
  type: SET_BEAT_LENGTH,
  beatLength,
})

export const JOIN_URL_STATE = 'join url state'
export const afJoinUrlState = (urlState) => ({
  type: JOIN_URL_STATE,
  urlState,
})
