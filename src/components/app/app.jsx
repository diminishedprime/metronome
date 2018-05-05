import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import BPM from '../hud/bpm.jsx'
import Controls from '../controls/controls.jsx'
import {
  versionPath,
  newContentAvailablePath,
  urlRelevantStatePath,
} from '../../redux/paths.js'
import queryString from 'query-string'
import './app.css'

const style = {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  marginTop: '1em',
}

const encodeUrl = (state) => {
  const urlState = queryString.stringify({
    urlState: JSON.stringify(R.view(urlRelevantStatePath, state)),
  })
  const url = `${window.location.protocol}//${window.location.host}${
    window.location.pathname
  }?${urlState}`
  return url
}

const mapStateToProps = (state) => ({
  version: R.view(versionPath, state),
  newContentAvailable: R.view(newContentAvailablePath, state),
  url: encodeUrl(state),
})

const NewContentAvailable = () => (
  <div
    style={{
      fontFamily: 'Helvetica',
      textAlign: 'center',
      fontSize: '1em',
      fontWeight: 'bold',
      padding: '1em',
    }}
  >
    There is a new version available, please refresh
  </div>
)

const App = ({version, newContentAvailable, url}) => (
  <div style={style}>
    {newContentAvailable && <NewContentAvailable />}
    <BPM />
    <Controls />
    <label style={{display: 'flex'}}>
      Settings
      <input
        style={{flexGrow: '1'}}
        readOnly
        value={url}
        onFocus={(e) => e.target.select()}
      />
    </label>
    <div style={{textAlign: 'center'}}>v{version}</div>
  </div>
)
export default connect(mapStateToProps)(App)
