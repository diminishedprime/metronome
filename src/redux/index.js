import queryString from 'query-string'
import createSagaMiddleware from 'redux-saga'
import {createStore, applyMiddleware} from 'redux'
import {afJoinUrlState} from './actions.js'

import {rootSaga} from './sagas/index.js'
import {app} from './reducers.js'

// Paths & Initial State

const sagaMiddleware = createSagaMiddleware()
export const store = createStore(app, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

// Join in any relevant fields passed in through the url.
const parsed = queryString.parse(window.location.search)
if (parsed && parsed.urlState) {
  const urlState = JSON.parse(parsed.urlState)
  store.dispatch(afJoinUrlState(urlState))
}
