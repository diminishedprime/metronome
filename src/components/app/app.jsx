import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import CommonTempos from '../controls/common-tempos.jsx'
import {versionPath, newContentAvailablePath} from '../../redux/paths.js'
import './app.css'

const style = {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
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
    <CommonTempos />
    <HUD />
    <Controls />
    <div style={{textAlign: 'center'}}>v{version}</div>
  </div>
)
export default connect(mapStateToProps)(App)
