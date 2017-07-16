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
  playingPath,
} from '../paths.js'
import {
  afKeyForStart,
  KEY_FOR_START,
  afKeyForDown,
  KEY_FOR_DOWN,
  afKeyForUp,
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
  switch (key) {
    case 'ArrowUp': yield put(afKeyForUp()); break
    case 'ArrowDown': yield put(afKeyForDown()); break
    case ' ': yield put(afKeyForStart()); break
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
