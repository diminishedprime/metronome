import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import BPM from '../hud/bpm.jsx'
import Controls from '../controls/controls.jsx'
import {versionPath, newContentAvailablePath} from '../../redux/paths.js'
import './app.css'

const style = {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
  marginTop: '1em',
}

const mapStateToProps = (state) => ({
  version: R.view(versionPath, state),
  newContentAvailable: R.view(newContentAvailablePath, state),
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

const App = ({version, newContentAvailable}) => (
  <div style={style}>
    {newContentAvailable && <NewContentAvailable />}
    <BPM />
    <Controls />
    <div style={{textAlign: 'center'}}>v{version}</div>
  </div>
)
export default connect(mapStateToProps)(App)
