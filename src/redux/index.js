import click from '../click.wav'
import createSagaMiddleware from 'redux-saga'
import {
  createStore,
  applyMiddleware,
} from 'redux'

import {
  rootSaga,
} from './sagas/index.js'
import {
  app,
} from './reducers.js'
import {
  afSetBuffer,
} from './actions.js'

// Paths & Initial State

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  app,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)

// load in wav
const fetchAsArrayBuffer = (url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open('GET', url, true)
    xhr.responseType = 'arraybuffer'

    xhr.onload = function() {
      if (xhr.response) {
        resolve(xhr.response)
      }
    }
    xhr.onerror = reject

    xhr.send()
  })
}

const decodeAudioData = (audioContext, arrayBuffer) => {
  return new Promise((resolve, reject) => {
    audioContext.decodeAudioData(arrayBuffer, resolve, reject);
  })
}

const audioContext = new AudioContext()

fetchAsArrayBuffer(click)
  .then((res) => decodeAudioData(audioContext, res)
    .then((buffer) => {
      store.dispatch(afSetBuffer(buffer))
    })
  )
