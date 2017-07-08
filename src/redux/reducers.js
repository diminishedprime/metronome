import R from 'ramda'

import {
  initialState,
} from './initial-state.js'

export const app = (state=initialState, action) => {
  switch(action.type) {
    case 'setRadians': return R.set(R.lensProp('radians'), action.radians, state)
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
