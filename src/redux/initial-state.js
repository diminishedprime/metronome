import R from 'ramda'
import {
  beatPath,
  beatsPerBarPath,
  masterVolumePath,
  quarterVolumePath,
  eighthVolumePath,
  sixteenthVolumePath,
  tripletVolumePath,
} from './paths.js'

export const initialState = R.compose(
  R.set(beatPath, undefined),
  R.set(beatsPerBarPath, 4),
  R.set(masterVolumePath, 0.5),
  R.set(quarterVolumePath, 1.0),
  R.set(eighthVolumePath, 0.0),
  R.set(sixteenthVolumePath, 0.0),
  R.set(tripletVolumePath, 0.0),
  R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 120,
})
