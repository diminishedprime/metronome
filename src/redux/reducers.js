import R from 'ramda'

import {
  initialState,
} from './initial-state.js'
import {
  SET_PLAYING,
  ADD_BPM,
} from './actions.js'
import {
  playingPath,
  radiansPath,
  bpmPath,
} from './paths.js'


const setRadians = (state, {radians}) => {
  const currentRads = R.view(radiansPath, state)
  const tmp = currentRads % (Math.PI*2)
  const diff = radians - tmp
  return R.over(radiansPath, R.add(diff), state)
}

const addBpm = (state, {amount}) => R.pipe(
    R.over(bpmPath, R.add(amount)),
    R.over(bpmPath, R.clamp(30, 300))
)(state)

const setPlaying = (state, {flag}) =>
  R.set(playingPath, flag, state)

export const app = (state=initialState, action) => {
  switch(action.type) {
    case SET_PLAYING: return setPlaying(state, action)
    case 'stateSetRadians': return setRadians(state, action)
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
