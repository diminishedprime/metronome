import React from 'react'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import './app.css'

const style = {
  fontFamily: 'Helvetica',
  margin: 'auto',
  display: 'flex',
}

const App = () => (
  <div style={style}>
    <HUD />
    <Controls />
  </div>
)
export default App
