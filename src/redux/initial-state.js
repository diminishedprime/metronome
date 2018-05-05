import R from 'ramda'
import {
  triplet,
  sixteenth,
  eighth,
  quarter,
  accent,
  master,
} from '../constants.js'
import {
  volumePathFor,
  mutePathFor,
  newContentAvailablePath,
  audioContextPath,
  versionPath,
  stylePath,
  styleIndexPath,
  styleBeatsPath,
  showTimeSignatureSettingsPath,
  beatPath,
  keymapPath,
  volumeControlPath,
  wheelControlPath,
  beatLengthPath,
} from './paths.js'
import {afKeyForStart, afKeyForDown, afKeyForUp} from './actions.js'

export const styles = [
  {
    name: '1',
    display: '1',
    beats: [1],
  },
  {
    name: '2',
    display: '2',
    beats: [2],
  },
  {
    name: '3',
    display: '3',
    beats: [3],
  },
  {
    name: '4',
    display: '4',
    beats: [4],
  },
  {
    name: '5',
    display: '5',
    beats: [5],
  },
  {
    name: '6',
    display: '6',
    beats: [6],
  },
  {
    name: '7',
    display: '7',
    beats: [7],
  },
  {
    name: '2+3',
    display: '(2+3)',
    beats: [2, 3],
  },
  {
    name: '2+2+3',
    display: '(2+2+3)',
    beats: [2, 2, 3],
  },
]

const initialKeymap = {
  ArrowUp: afKeyForUp(),
  ArrowDown: afKeyForDown(),
  ' ': afKeyForStart(),
  Enter: afKeyForStart(),
}

const version = process.env.REACT_APP_VERSION || 'error'

const acConstructor = window.AudioContext || window.webkitAudioContext
const audioContext = new acConstructor()

export const initialState = R.compose(
  R.set(newContentAvailablePath, false),
  R.set(mutePathFor(master), false),
  R.set(mutePathFor(accent), false),
  R.set(mutePathFor(quarter), false),
  R.set(mutePathFor(eighth), false),
  R.set(mutePathFor(sixteenth), false),
  R.set(mutePathFor(triplet), false),
  R.set(audioContextPath, audioContext),
  R.set(versionPath, version),
  R.set(keymapPath, initialKeymap),
  R.set(styleBeatsPath, 0),
  R.set(styleIndexPath, 3),
  R.set(showTimeSignatureSettingsPath, false),
  R.set(beatPath, undefined),
  R.set(stylePath, styles),
  R.set(beatLengthPath, quarter),
  R.set(volumePathFor(master), 0.5),
  R.set(volumePathFor(accent), 0.5),
  R.set(volumePathFor(quarter), 0.5),
  R.set(volumePathFor(eighth), 0.0),
  R.set(volumePathFor(sixteenth), 0.0),
  R.set(volumePathFor(triplet), 0.0),
  R.set(volumeControlPath, false),
  R.set(wheelControlPath, false),
  R.identity
)({
  radians: 4.7,
  size: 300,
  bpm: 125,
})
