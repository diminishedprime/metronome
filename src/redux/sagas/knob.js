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
  takeEvery,
} from 'redux-saga/effects'
import {
  afSetBPM,
  TAP_IN,
  START_METRONOME,
  afSetPlaying,
  STOP_METRONOME,
  ADD_BPM,
  afStartMetronome,
} from '../actions.js'
import { playingPath, bufferPath } from '../paths.js'

const bufferSetBpm = function* () {
  yield takeLatest(ADD_BPM, function* () {
    const isPlaying = yield select(R.view(playingPath))
    if (isPlaying) {
      yield delay(500)
      yield put(afStartMetronome())
    }
  })
}
const audioContext = new AudioContext()

const beep = function* (buffer, millis) {
  const source = audioContext.createBufferSource()
  source.buffer = buffer
  source.connect(audioContext.destination)
  source.start()
  const {shouldContinue} = yield race({
    shouldContinue: call(delay, millis),
    stop: take(STOP_METRONOME),
  })
  if (shouldContinue) {
    yield beep(buffer, millis)
  } else {
    yield put(afSetPlaying(false))
  }
}

const startMetronome = function* () {
  yield takeLatest(START_METRONOME, function* () {
    const buffer = yield select(R.view(bufferPath))
    yield put(afSetPlaying(true))
    const bpm = yield select(R.prop('bpm'))
    const bpmAsMillis = 60000 / bpm
    yield beep(buffer, bpmAsMillis)
  })
}

const tapIn = function* () {
  let previousTaps = []
  yield takeEvery(TAP_IN, function* () {
    const timeStamp = new Date().getTime()
    if (previousTaps.length < 3) {
      previousTaps = R.append(timeStamp, previousTaps)
    } else {
      previousTaps = R.pipe(
        R.append(timeStamp),
        R.remove(0, 1)
      )(previousTaps)
    }
    if (previousTaps.length > 1) {
      const average = R.pipe(
        R.aperture(2),
        R.map(([a, b]) => b - a),
        R.mean
      )(previousTaps)
      yield put(afSetBPM(60000/average))
    }
  })
}

export default function* () {
  yield all([
    tapIn(),
    bufferSetBpm(),
    startMetronome(),
  ])
}
