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
  afSetPlaying,
  STOP_METRONOME,
  START_METRONOME,
  afSetBeat,
} from '../actions.js'
import {
  beatsPerBarPath,
  beatPath,
  playingPath,
  masterVolumePath,
  quarterVolumePath,
  eighthVolumePath,
  sixteenthVolumePath,
  tripletVolumePath,
} from '../paths.js'

const audioContext = new AudioContext()
let current16thNote = 0
const lookahead = 25.0
const scheduleAheadTime = 0.1
let nextNoteTime = 0.0
const noteLength = 0.05
const notesInQueue = []

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
const scheduleNote = function* (beatNumber, time) {
  notesInQueue.push( { note: beatNumber, time: time } )
  if (time - audioContext.currentTime > 0 && beatNumber === 0) {
    const beat = yield select(R.view(beatPath))
    const beatsPerBar = yield select(R.view(beatsPerBarPath))
    if (beat) {
      const newBeat = (beat + 1)
      if (newBeat === beatsPerBar + 1) {
        yield put(afSetBeat(1))
      } else {
        yield put(afSetBeat(newBeat))
      }
    } else {
      yield put(afSetBeat(1))
    }
  }

  let path
  let oscValue
  switch (beatNumber) {
    // Everything on beat 1
    case 0: path = quarterVolumePath; oscValue = 880; break

      // Eigth Notes Halfway Through
    case 6: path = eighthVolumePath; oscValue = 880; break

      // Sixteenth notes to either side of eighth
    case 3:
    case 9: path = sixteenthVolumePath; oscValue = 880; break

      // Triplets right after and right before sixteenths
    case 4:
    case 8: path = tripletVolumePath; oscValue = 880; break
  }
  let volume = 0
  if (path) {
    volume = yield select(R.view(path))
  }
  const masterVolume = yield select(R.view(masterVolumePath))
  if (masterVolume === 0 || volume === 0) {
    return
  }

  // create an oscillator
  const osc = audioContext.createOscillator()
  osc.frequency.value = oscValue
  const gainNode = audioContext.createGain()

  gainNode.gain.value = masterVolume * volume
  osc.connect(gainNode)
  gainNode.connect(audioContext.destination)
  osc.start( time )
  osc.stop( time + noteLength )
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
