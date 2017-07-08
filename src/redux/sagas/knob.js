import R from 'ramda'
import {
  delay,
} from 'redux-saga'
import {
  takeEvery,
  takeLatest,
  select,
  put,
  all,
  take,
  race,
  call,
} from 'redux-saga/effects'
import {
  START_METRONOME,
  afSetPlaying,
  STOP_METRONOME,
  afAddBPM,
  ADD_BPM,
  afStartMetronome,
} from '../actions.js'
import { playingPath } from '../paths.js'

const bufferSetBpm = function* () {
  yield takeLatest(ADD_BPM, function* () {
    const isPlaying = yield select(R.view(playingPath))
    if (isPlaying) {
      yield delay(500)
      yield put(afStartMetronome())
    }
  })
}

const beep = function* (audio, millis) {
  audio.play()
  const {shouldContinue} = yield race({
    shouldContinue: call(delay, millis),
    stop: take(STOP_METRONOME),
  })
  if (shouldContinue) {
    yield beep(audio, millis)
  } else {
    yield put(afSetPlaying(false))
  }
}

const startMetronome = function* () {
  const audio = yield select(R.prop('audio'))
  yield takeLatest(START_METRONOME, function* () {
    yield put(afSetPlaying(true))
    const bpm = yield select(R.prop('bpm'))
    const bpmAsMillis = 60000 / bpm
    yield beep(audio, bpmAsMillis)
  })
}

const threshold = (Math.PI) / 60
let totalDiff = 0
const bufferChange = function* () {
  yield takeEvery('async addtobuffer', function* ({diff}) {
    if (Math.abs(totalDiff) < threshold) {
      totalDiff += diff
    } else {
      yield put(afAddBPM((totalDiff > 0) ? -1 : 1))
      totalDiff = 0
    }
  })
}

const setRadians = function* () {
  yield takeEvery('async setRadians', function* ({radians}) {
    const currentRads = yield select(R.prop('radians'))
    const diff = currentRads - radians
    yield put({type: 'async addtobuffer', diff})
    yield put({type: 'stateSetRadians', radians})
  })
}

export default function* () {
  yield all([
    setRadians(),
    bufferChange(),
    bufferSetBpm(),
    startMetronome(),
  ])
}
