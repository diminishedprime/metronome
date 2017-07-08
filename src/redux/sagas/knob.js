import R from 'ramda'
import {
  delay,
} from 'redux-saga'
import {
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

export default function* () {
  yield all([
    bufferSetBpm(),
    startMetronome(),
  ])
}
