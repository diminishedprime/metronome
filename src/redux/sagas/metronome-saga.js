import R from 'ramda'
import {
  eventChannel,
} from 'redux-saga'
import {
  takeEvery,
  select,
  put,
  takeLatest,
  all,
  take,
} from 'redux-saga/effects'
import initWorker from './timer-worker.js'
import {
  afNextBeatGroup,
  afSetPlaying,
  STOP_METRONOME,
  START_METRONOME,
  afSetBeat,
} from '../actions.js'
import {
  accentVolumePath,
  styleBeatsPath,
  stylePath,
  styleIndexPath,
  beatPath,
  playingPath,
  masterVolumePath,
  quarterVolumePath,
  eighthVolumePath,
  sixteenthVolumePath,
  tripletVolumePath,
} from '../paths.js'

const acConstructor = window.AudioContext || window.webkitAudioContext
const audioContext = new acConstructor()
// For some reason this makes it work on Safari?
audioContext.createGain && audioContext.createGain()
let current16thNote = 0
const lookahead = 25.0
const scheduleAheadTime = 0.1
let nextNoteTime = 0.0
const baseNoteLength = 0.05

const nextNote = function* () {
  const bpm = yield select(R.prop('bpm'))
  const secondsPerBeat = 60.0 / bpm
  nextNoteTime += (1/12) * secondsPerBeat// Add beat length to last beat time

  current16thNote = current16thNote + 1// Advance the beat number, wrap to zero
  if (current16thNote === 12) {
    current16thNote = 0
  }
}

// 01  02  03  04  05  06  07  08  09  10  11  12
// Q
// E                       E
// T               T               T
// S           S           S           S
const frequencyForBeat = R.cond([
  // Quarter
  [R.equals(0), R.always(880)],
  // Eigth note
  [R.equals(6), R.always(880)],
  // Sixteenth Notes
  [R.equals(3), R.always(880)],
  [R.equals(9), R.always(880)],
  // Triplets
  [R.equals(4), R.always(880)],
  [R.equals(8), R.always(880)],
  // Everything else
  [R.T, R.always(undefined)],
])

const pathForBeat = R.cond([
  // Quarter
  [R.equals(0), R.always(quarterVolumePath)],
  // Eigth note
  [R.equals(6), R.always(eighthVolumePath)],
  // Sixteenth Notes
  [R.equals(3), R.always(sixteenthVolumePath)],
  [R.equals(9), R.always(sixteenthVolumePath)],
  // Triplets
  [R.equals(4), R.always(tripletVolumePath)],
  [R.equals(8), R.always(tripletVolumePath)],
  // Everything else
  [R.T, R.always(undefined)],
])

const updateUIBeatNumber = function* (beatNumber, time) {
  if (time - audioContext.currentTime > 0 && beatNumber === 0) {
    const beat = yield select(R.view(beatPath))
    const styles = yield select(R.view(stylePath))
    const styleIndex = yield select(R.view(styleIndexPath))
    const beats = yield select(R.view(styleBeatsPath))
    const beatsPerBar = styles[styleIndex].beats[beats]
    if (beat !== undefined) {
      const newBeat = (beat + 1)
      if (newBeat >= beatsPerBar + 1) {
        yield put(afSetBeat(1))
        yield put(afNextBeatGroup())
      } else {
        yield put(afSetBeat(newBeat))
      }
    } else {
      yield put(afSetBeat(1))
    }
  }
}

const getVolume = function* (beatNumber) {
  const path = pathForBeat(beatNumber)
  if (path) {
    const volume = yield select(R.view(path))
    const masterVolume = yield select(R.view(masterVolumePath))
    return (volume * masterVolume)
  } else {
    return undefined
  }
}

const playNote = (freq, volume, start) => {
  const osc = audioContext.createOscillator()
  osc.frequency.value = freq

  const gainNode = audioContext.createGain()
  gainNode.gain.value = volume
  osc.connect(gainNode)

  gainNode.connect(audioContext.destination)
  osc.start(start)
  const noteLength = Math.floor(freq * baseNoteLength) * (1/freq)
  osc.stop(start + noteLength)
}

const playSubdivision = function* (time, beatNumber) {
  const oscValue = yield frequencyForBeat(beatNumber)
  const volume = yield getVolume(beatNumber)
  if (!(volume && oscValue)) {
    return
  }
  playNote(oscValue, volume, time)
}

const playAccent = function* (time, beatNumber) {
  const beat = yield select(R.view(beatPath))
  const volume = yield select(R.view(accentVolumePath))
  if (beat === 1 && beatNumber === 0 && volume > 0) {
    const freq = frequencyForBeat(beatNumber) * 2
    playNote(freq, volume, time)
  }
}

const scheduleNote = function* (beatNumber, time) {
  yield updateUIBeatNumber(beatNumber, time)
  yield playSubdivision(time, beatNumber)
  yield playAccent(time, beatNumber)
}

const scheduler = function* () {
  // while there are notes that will need to play before the next interval,
  // schedule them and advance the pointer.
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime ) {
    yield scheduleNote( current16thNote, nextNoteTime )
    yield nextNote()
  }
}

const stopMetronome = function* (timerWorker) {
  yield takeEvery(STOP_METRONOME, function* () {
    timerWorker.postMessage('stop')
    yield put(afSetPlaying(false))
    yield put(afSetBeat(undefined))
  })
}

const metronome = function* (timerWorker) {
  const chan = eventChannel((emitter) => {
    timerWorker.onmessage = function(e) {
      emitter(e)
    }
    return () => {
      timerWorker.onmessage = null
    }
  })

  yield takeLatest(START_METRONOME, function* () {
    timerWorker.postMessage({'interval':lookahead})
    timerWorker.postMessage('start')
    nextNoteTime = audioContext.currentTime - baseNoteLength
    yield put(afSetPlaying(true))

    let fromChan
    while ((fromChan = yield take(chan))) {
      const { data } = fromChan
      if (data === 'tick') {
        //eslint-disable-next-line
        /* console.log('do a tick')*/
        yield scheduler()
      } else {
        //eslint-disable-next-line
        console.log(data)
      }
      const isPlaying = yield select(R.view(playingPath))
      if (!isPlaying) {
        break
      }
    }
  })
}

export default function* () {
  const timerWorker = initWorker()
  yield all([
    metronome(timerWorker),
    stopMetronome(timerWorker),
  ])
}
