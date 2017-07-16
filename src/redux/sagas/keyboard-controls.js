import {
  eventChannel,
} from 'redux-saga'
import R from 'ramda'
import {
  select,
  all,
  take,
  put,
  takeEvery,
} from 'redux-saga/effects'
import {
  keymapPath,
  playingPath,
} from '../paths.js'
import {
  KEY_FOR_START,
  KEY_FOR_DOWN,
  KEY_FOR_UP,
  afAddBPM,
  afStartMetronome,
  afStopMetronome,
} from '../actions.js'

const forKeyStart = function* () {
  yield takeEvery(KEY_FOR_START, function* () {
    const isPlaying = yield select(R.view(playingPath))
    if (isPlaying) {
      yield put(afStopMetronome())
    } else {
      yield put(afStartMetronome())
    }
  })
}

const forKeyUp = function* () {
  yield takeEvery(KEY_FOR_UP, function* () {
    yield put(afAddBPM(+1))
  })
}

const forKeyDown = function* () {
  yield takeEvery(KEY_FOR_DOWN, function* () {
    yield put(afAddBPM(-1))
  })
}

const onDocumentKeyDown = function* (chan) {
  const {key} = yield take(chan)
  const keyPath = R.compose(keymapPath, R.lensPath([key]))
  const action = yield select(R.view(keyPath))
  if (action) {
    yield put(action)
  }
  yield onDocumentKeyDown(chan)
}

const documentKeyPressSaga = function* () {
  const chan = eventChannel((emitter) => {
    document.onkeydown = (e) => emitter(e)
    return () => {
      document.onkeypress = null
    }
  })
  yield onDocumentKeyDown(chan)
}

export default function* () {
  yield all([
    forKeyStart(),
    forKeyUp(),
    forKeyDown(),
    documentKeyPressSaga(),
  ])
}
