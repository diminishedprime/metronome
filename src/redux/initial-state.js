import R from 'ramda'

export const initialState = R.compose(
   R.identity
)({
  radians: Math.PI * 3/4,
  size: 300,
})
