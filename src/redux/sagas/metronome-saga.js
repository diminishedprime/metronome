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
  masterMutePath,
  accentMutePath,
  quarterMutePath,
  eighthMutePath,
  sixteenthMutePath,
  tripletMutePath,
  audioContextPath,
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
  [R.equals(0), R.always([quarterVolumePath, quarterMutePath])],
  // Eigth note
  [R.equals(6), R.always([eighthVolumePath, eighthMutePath])],
  // Sixteenth Notes
  [R.equals(3), R.always([sixteenthVolumePath, sixteenthMutePath])],
  [R.equals(9), R.always([sixteenthVolumePath, sixteenthMutePath])],
  // Triplets
  [R.equals(4), R.always([tripletVolumePath, tripletMutePath])],
  [R.equals(8), R.always([tripletVolumePath, tripletMutePath])],
  // Everything else
  [R.T, R.always([undefined, undefined])],
])

const updateUIBeatNumber = function* (beatNumber, time) {
  const audioContext = yield select(R.view(audioContextPath))
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
  const [volumePath, mutePath] = pathForBeat(beatNumber)
  if (volumePath) {
    const volume = yield select(R.view(volumePath))
    const masterVolume = yield select(R.view(masterVolumePath))
    const muted = yield select(R.view(mutePath))
    const masterMuted = yield select(R.view(masterMutePath))
    return (muted || masterMuted ? 0 : (volume * masterVolume))
  } else {
    return undefined
  }
}

const playNote = (audioContext, freq, volume, start) => {
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
  const audioContext = yield select(R.view(audioContextPath))
  const oscValue = yield frequencyForBeat(beatNumber)
  const volume = yield getVolume(beatNumber)
  if (!(volume && oscValue)) {
    return
  }
  playNote(audioContext, oscValue, volume, time)
}

const playAccent = function* (time, beatNumber) {
  const audioContext = yield select(R.view(audioContextPath))
  const beat = yield select(R.view(beatPath))

  const volume = yield select(R.view(accentVolumePath))
  const masterVolume = yield select(R.view(masterVolumePath))
  const muted = yield select(R.view(accentMutePath))
  const masterMuted = yield select(R.view(masterMutePath))
  const accentVolume = (muted || masterMuted ? 0 : (volume * masterVolume))


  if (beat === 1 && beatNumber === 0 && volume > 0) {
    const freq = frequencyForBeat(beatNumber) * 2
    playNote(audioContext, freq, accentVolume, time)
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
  const audioContext = yield select(R.view(audioContextPath))
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
    const audioContext = yield select(R.view(audioContextPath))
    nextNoteTime = Math.max(audioContext.currentTime - baseNoteLength, 0)
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
