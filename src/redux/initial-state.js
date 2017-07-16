import R from 'ramda'
import {
  versionPath,
  stylePath,
  styleIndexPath,
  styleBeatsPath,
  showTimeSignatureSettingsPath,
  beatPath,
  masterVolumePath,
  accentVolumePath,
  quarterVolumePath,
  eighthVolumePath,
  sixteenthVolumePath,
  tripletVolumePath,
  keymapPath,
} from './paths.js'
import {
  afKeyForStart,
  afKeyForDown,
  afKeyForUp,
} from './actions.js'

export const styles = [
  {
    name: '1',
    beats: [1],
  }, {
    name: '2',
    beats: [2],
  }, {
    name: '3',
    beats: [3],
  }, {
    name: '4',
    beats: [4],
  }, {
    name: '5',
    beats: [5],
  }, {
    name: '6',
    beats: [6],
  }, {
    name: '7',
    beats: [7],
  }, {
    name: '2+3',
    beats: [2, 3],
  },
]

const initialKeymap = {
  'ArrowUp': afKeyForUp(),
  'ArrowDown': afKeyForDown(),
  ' ': afKeyForStart(),
  'Enter': afKeyForStart(),
}

const version = process.env.REACT_APP_VERSION || 'error'

export const initialState = R.compose(
  R.set(versionPath, version),
  R.set(keymapPath, initialKeymap),
  R.set(styleBeatsPath, 0),
  R.set(styleIndexPath, 3),
  R.set(showTimeSignatureSettingsPath, false),
  R.set(beatPath, undefined),
  R.set(stylePath, styles),
  R.set(masterVolumePath, 0.5),
  R.set(accentVolumePath, 0.5),
  R.set(quarterVolumePath, 0.5),
  R.set(eighthVolumePath, 0.0),
  R.set(sixteenthVolumePath, 0.0),
  R.set(tripletVolumePath, 0.0),
  R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 125,
})
