import R from 'ramda'
import {
  masterVolumePath,
  quarterVolumePath,
} from './paths.js'

export const initialState = R.compose(
  R.set(masterVolumePath, 0.5),
  R.set(quarterVolumePath, 1.0),
  R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 120,
})
