import R from 'ramda'

const audio = document.createElement('audio')
audio.setAttribute('src', 'https://github.com/wilson428/metronome/blob/master/tick.wav?raw=true')

export const initialState = R.compose(
   R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 50,
  audio,
})
