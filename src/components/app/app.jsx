import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import CommonTempos from '../controls/common-tempos.jsx'
import {
  versionPath,
} from '../../redux/paths.js'
import './app.css'


const style = {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}

const mapStateToProps = (state) => ({
  version: R.view(versionPath, state),
})

const App = ({version}) => (
  <div style={style}>
    <CommonTempos />
    <HUD />
    <Controls />
    <div style={{textAlign: 'center'}}>v{version}</div>
  </div>
)
export default connect(
  mapStateToProps
)(App)
