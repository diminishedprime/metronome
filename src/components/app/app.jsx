import React from 'react'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import CommonTempos from '../controls/common-tempos.jsx'
import './app.css'

const style = {
  fontFamily: 'Helvetica',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
}

const App = () => (
  <div style={style}>
    <CommonTempos />
    <HUD />
    <Controls />
  </div>
)
export default App
