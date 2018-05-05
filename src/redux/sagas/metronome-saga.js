import R from 'ramda'
import {eventChannel} from 'redux-saga'
import {takeEvery, select, put, takeLatest, all, take} from 'redux-saga/effects'
import initWorker from './timer-worker.js'
import {
  triplet,
  sixteenth,
  eighth,
  quarter,
  accent,
  master,
  half,
} from '../../constants.js'
import {
  afNextBeatGroup,
  afSetPlaying,
  STOP_METRONOME,
  START_METRONOME,
  afSetBeat,
  afSetBeatGroup,
} from '../actions.js'
import {
  audioContextPath,
  styleBeatsPath,
  stylePath,
  styleIndexPath,
  beatPath,
  playingPath,
  volumePathFor,
  mutePathFor,
  beatLengthPath,
  bpmPath,
} from '../paths.js'

let current16thNote = 0
const lookahead = 25.0
const scheduleAheadTime = 0.1
let nextNoteTime = 0.0
const baseNoteLength = 0.05

const multiplierForBeatLength = {
  [sixteenth]: 0.25,
  [eighth]: 0.5,
  [quarter]: 1,
  [half]: 2,
}

const nextNote = function*() {
  const bpm = yield select(R.view(bpmPath))
  const beatLength = yield select(R.view(beatLengthPath))
  const secondsPerBeat = 60.0 / bpm * multiplierForBeatLength[beatLength]
  nextNoteTime += 1 / 12 * secondsPerBeat // Add beat length to last beat time

  current16thNote = current16thNote + 1 // Advance the beat number, wrap to zero
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
  [R.equals(0), R.always([volumePathFor(quarter), mutePathFor(quarter)])],
  // Eigth note
  [R.equals(6), R.always([volumePathFor(eighth), mutePathFor(eighth)])],
  // Sixteenth Notes
  [R.equals(3), R.always([volumePathFor(sixteenth), mutePathFor(sixteenth)])],
  [R.equals(9), R.always([volumePathFor(sixteenth), mutePathFor(sixteenth)])],
  // Triplets
  [R.equals(4), R.always([volumePathFor(triplet), mutePathFor(triplet)])],
  [R.equals(8), R.always([volumePathFor(triplet), mutePathFor(triplet)])],
  // Everything else
  [R.T, R.always([undefined, undefined])],
])

const updateUIBeatNumber = function*(beatNumber, time) {
  const audioContext = yield select(R.view(audioContextPath))
  if (time - audioContext.currentTime > 0 && beatNumber === 0) {
    const beat = yield select(R.view(beatPath))
    const styles = yield select(R.view(stylePath))
    const styleIndex = yield select(R.view(styleIndexPath))
    const beats = yield select(R.view(styleBeatsPath))
    const beatsPerBar = styles[styleIndex].beats[beats]
    if (beat !== undefined) {
      const newBeat = beat + 1
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

const getVolume = function*(beatNumber) {
  const [volumePath, mutePath] = pathForBeat(beatNumber)
  if (volumePath) {
    const volume = yield select(R.view(volumePath))
    const masterVolume = yield select(R.view(volumePathFor(master)))
    const muted = yield select(R.view(mutePath))
    const masterMuted = yield select(R.view(mutePathFor(master)))
    return muted || masterMuted ? 0 : volume * masterVolume
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
  const noteLength = Math.floor(freq * baseNoteLength) * (1 / freq)
  osc.stop(start + noteLength)
}

const playSubdivision = function*(time, beatNumber) {
  const audioContext = yield select(R.view(audioContextPath))
  const oscValue = yield frequencyForBeat(beatNumber)
  const volume = yield getVolume(beatNumber)
  if (!(volume && oscValue)) {
    return
  }
  playNote(audioContext, oscValue, volume, time)
}

const playAccent = function*(time, beatNumber) {
  const audioContext = yield select(R.view(audioContextPath))
  const beat = yield select(R.view(beatPath))

  const volume = yield select(R.view(volumePathFor(accent)))
  const masterVolume = yield select(R.view(volumePathFor(master)))
  const muted = yield select(R.view(mutePathFor(accent)))
  const masterMuted = yield select(R.view(mutePathFor(master)))
  const accentVolume = muted || masterMuted ? 0 : volume * masterVolume

  if (beat === 1 && beatNumber === 0 && volume > 0) {
    const freq = frequencyForBeat(beatNumber) * 2
    playNote(audioContext, freq, accentVolume, time)
  }
}

const scheduleNote = function*(beatNumber, time) {
  yield updateUIBeatNumber(beatNumber, time)
  yield playSubdivision(time, beatNumber)
  yield playAccent(time, beatNumber)
}

const scheduler = function*() {
  // while there are notes that will need to play before the next interval,
  // schedule them and advance the pointer.
  const audioContext = yield select(R.view(audioContextPath))
  while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
    yield scheduleNote(current16thNote, nextNoteTime)
    yield nextNote()
  }
}

const stopMetronome = function*(timerWorker) {
  yield takeEvery(STOP_METRONOME, function*() {
    timerWorker.postMessage('stop')
    yield put(afSetPlaying(false))
    yield put(afSetBeat(undefined))
    yield put(afSetBeatGroup(0))
  })
}

const scheduleBasedOnChan = function*(chan) {
  const fromChan = yield take(chan)
  const {data} = fromChan
  if (data === 'tick') {
    yield scheduler()
  }
  const isPlaying = yield select(R.view(playingPath))
  if (!isPlaying) {
    return
  } else {
    yield scheduleBasedOnChan(chan)
  }
}

const metronome = function*(timerWorker) {
  const chan = eventChannel((emitter) => {
    timerWorker.onmessage = function(e) {
      emitter(e)
    }
    return () => {
      timerWorker.onmessage = null
    }
  })

  yield takeLatest(START_METRONOME, function*() {
    const audioContext = yield select(R.view(audioContextPath))
    yield audioContext.resume()
    current16thNote = 0
    timerWorker.postMessage({interval: lookahead})
    timerWorker.postMessage('start')
    nextNoteTime = Math.max(audioContext.currentTime - baseNoteLength, 0)
    yield put(afSetPlaying(true))
    yield scheduleBasedOnChan(chan)
  })
}

export default function*() {
  const timerWorker = initWorker()
  yield all([metronome(timerWorker), stopMetronome(timerWorker)])
}
