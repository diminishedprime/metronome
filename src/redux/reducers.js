import R from 'ramda'

import {
  initialState,
} from './initial-state.js'
import {
  SET_PLAYING,
  ADD_BPM,
  SET_BPM,
  SET_BUFFER,
  SET_VOLUME,
} from './actions.js'
import {
  playingPath,
  bpmPath,
  bufferPath,
} from './paths.js'

const clampBPM = R.pipe(
  R.over(bpmPath, R.clamp(30, 250)),
  R.over(bpmPath, Math.floor)
)

const setBPM = (state, {bpm}) => R.pipe(
  R.set(bpmPath, bpm),
  clampBPM
)(state)

const addBpm = (state, {amount}) => R.pipe(
  R.over(bpmPath, R.add(amount)),
  clampBPM
)(state)

const setPlaying = (state, {flag}) =>
  R.set(playingPath, flag, state)

const setBuffer = (state, {buffer, bufferName}) =>
  R.set(bufferPath(bufferName), buffer, state)

const setVolume = (state, {path, value}) =>
  R.set(path, value, state)

export const app = (state=initialState, action) => {
  switch(action.type) {
    case SET_VOLUME: return setVolume(state, action)
    case SET_BUFFER: return setBuffer(state, action)
    case SET_PLAYING: return setPlaying(state, action)
    case SET_BPM: return setBPM(state, action)
    case ADD_BPM: return addBpm(state, action)
    default:
      if (!(
        action.type.startsWith('async') ||
        action.type.startsWith('@@redux')
      )) {
        // eslint-disable-next-line no-console
        console.log(`${action.type} not handled`)
      }
      return state
  }

}
