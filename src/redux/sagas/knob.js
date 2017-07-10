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
  fork,
} from 'redux-saga/effects'
import {
  afSetBPM,
  TAP_IN,
  START_METRONOME,
  afSetPlaying,
  STOP_METRONOME,
  ADD_BPM,
  SET_BPM,
  afStartMetronome,
} from '../actions.js'
import { playingPath, bufferPath, masterVolumePath, quarterVolumePath, eighthVolumePath, sixteenthVolumePath, tripletVolumePath } from '../paths.js'

const bufferSetBpm = function* () {
  yield takeLatest(({type}) => type === ADD_BPM || type === SET_BPM, function* () {
    const isPlaying = yield select(R.view(playingPath))
    if (isPlaying) {
      yield delay(500)
      yield put(afStartMetronome())
    }
  })
}
const audioContext = new AudioContext()

const fancyBeep = function* (buffer, millis, path, offset) {
  const volume = yield select(R.view(path))
  if (volume > 0) {
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    const gainNode = audioContext.createGain()
    const masterVolume = yield select(R.view(masterVolumePath))
    gainNode.gain.value = masterVolume * volume
    gainNode.connect(audioContext.destination)
    source.connect(gainNode)
    source.start()
  }

  const timeBeforeDelay = new Date().getTime()
  const {shouldContinue} = yield race({
    shouldContinue: call(delay, (millis - offset)),
    stop: take(STOP_METRONOME),
  })
  const expectedTime = timeBeforeDelay + (millis - offset)
  const actualTime = new Date().getTime()
  const newOffset = actualTime - expectedTime

  if (shouldContinue) {
    yield fancyBeep(buffer, millis, path, newOffset)
  } else {
    yield put(afSetPlaying(false))
  }
}

// 1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24
// q         s   puh       e           let   s
const betterPerfBeep = function* (buffer, millis24th, idx, offset) {
  let path
  let doPlay = true
  switch (idx) {
    case 0: path = quarterVolumePath; break
    case 5: path = sixteenthVolumePath; break
    case 7: path = tripletVolumePath; break
    case 11: path = eighthVolumePath; break
    case 15: path = tripletVolumePath; break
    case 17: path = sixteenthVolumePath; break
    default: doPlay = false; break
  }
  if (doPlay) {
    const volume = yield select(R.view(path))
    const masterVolume = yield select(R.view(masterVolumePath))
    const source = audioContext.createBufferSource()
    source.buffer = buffer
    const gainNode = audioContext.createGain()
    gainNode.gain.value = masterVolume * volume
    gainNode.connect(audioContext.destination)
    source.connect(gainNode)
    source.start()
  }

  const timeBeforeDelay = new Date().getTime()
  const {shouldContinue} = yield race({
    shouldContinue: call(delay, millis24th),
    stop: take(STOP_METRONOME),
  })
  const actualTime = new Date().getTime()
  const expectedTime = timeBeforeDelay + (millis24th - offset)
  const newOffset = actualTime - expectedTime
  if (shouldContinue) {
    yield betterPerfBeep(buffer, millis24th, (idx + 1) % 24, newOffset)
  } else {
    yield put(afSetPlaying(false))
  }
}

const beep = function* (tempoAsMillis) {
  const buffer = yield select(R.view(bufferPath))
  yield betterPerfBeep(buffer, Math.round(tempoAsMillis/24), 0, 0)
}

const startMetronome = function* () {
  yield takeLatest(START_METRONOME, function* () {
    yield put(afSetPlaying(true))
    const bpm = yield select(R.prop('bpm'))
    const bpmAsMillis = 60000 / bpm
    yield beep(bpmAsMillis)
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
      const isPlaying = yield select(R.view(playingPath))
      if (isPlaying) {
        yield put(afStartMetronome())
      }
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
