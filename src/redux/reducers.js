import R from 'ramda'

import {
  initialState,
} from './initial-state.js'

const radiansPath = R.lensPath(['radians'])
const bpmPath = R.lensPath(['bpm'])

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

export const app = (state=initialState, action) => {
  switch(action.type) {
    case 'stateSetRadians': return setRadians(state, action)
    case 'add bpm': return addBpm(state, action)
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
