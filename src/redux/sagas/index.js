import {
  all,
} from 'redux-saga/effects'

import knob from './knob.js'

export const rootSaga = function* () {
  yield all([
    knob(),
  ])
}
