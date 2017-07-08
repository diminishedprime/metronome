import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { afStopMetronome, afStartMetronome } from '../../redux/actions.js'
import { playingPath } from '../../redux/paths.js'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import './app.css'

const App = () => (
  <div className="app">
    <HUD />
    <Controls />
  </div>
)
export default App
