import {
  all,
} from 'redux-saga/effects'
import metronome from './metronome-saga.js'
import knob from './knob.js'

export const rootSaga = function* () {
  yield all([
    metronome(),
    knob(),
  ])
}
