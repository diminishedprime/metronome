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

// Paths & Initial State

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(
  app,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(rootSaga)
