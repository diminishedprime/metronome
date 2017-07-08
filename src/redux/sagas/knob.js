import R from 'ramda'
import {
  eventChannel,
} from 'redux-saga'
import {
  takeEvery,
  takeLatest,
  select,
  put,
  all,
  take,
} from 'redux-saga/effects'

const togglePlaying = function* () {
  const audio = yield select(R.prop('audio'))

  yield takeLatest((action) => {
    return action.type === 'async togglePlaying'
    || action.type === 'add bpm'
  }, function* () {
    const bpm = yield select(R.prop('bpm'))
    const bpmAsMillis = 60000 / bpm
    console.log(bpmAsMillis)
    let iv
    const chan = eventChannel((emitter) => {
      iv = setInterval(() => {
        emitter('ayy lmao')
      }, bpmAsMillis)
      return () => clearInterval(iv)
    })
    try {
      audio.play()
      let beep
      while ((beep = yield take(chan))) {
        audio.play()
      }
    } finally {
      clearInterval(iv)
    }
  })
}

const threshold = (Math.PI) / 60
let totalDiff = 0
const bufferChange = function* () {
  yield takeEvery('async addtobuffer', function* ({diff}) {
    if (Math.abs(totalDiff) < threshold) {
      totalDiff += diff
    } else {
      yield put({type: 'add bpm', amount: (totalDiff > 0) ? -1 : 1})
      totalDiff = 0
    }
  })
}

const setRadians = function* () {
  yield takeEvery('async setRadians', function*({radians}) {
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
    togglePlaying(),
  ])
}
