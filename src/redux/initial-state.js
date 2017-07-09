import R from 'ramda'

export const initialState = R.compose(
  R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 120,
})
