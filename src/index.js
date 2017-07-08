import React from 'react'
import ReactDOM from 'react-dom'
import {
  Provider,
} from 'react-redux'

import App from './components/app/app.jsx'
import registerServiceWorker from './registerServiceWorker'
import {
  store,
} from './redux/index.js'

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
