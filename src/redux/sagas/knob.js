import R from 'ramda'
import {put, all, takeEvery} from 'redux-saga/effects'
import {afSetBPM, TAP_IN} from '../actions.js'

const tapIn = function*() {
  let previousTaps = []
  yield takeEvery(TAP_IN, function*() {
    const timeStamp = new Date().getTime()
    if (previousTaps.length < 3) {
      previousTaps = R.append(timeStamp, previousTaps)
    } else {
      previousTaps = R.pipe(R.append(timeStamp), R.remove(0, 1))(previousTaps)
    }
    if (previousTaps.length > 1) {
      const average = R.pipe(R.aperture(2), R.map(([a, b]) => b - a), R.mean)(
        previousTaps
      )
      yield put(afSetBPM(60000 / average))
    }
  })
}

export default function*() {
  yield all([tapIn()])
}
