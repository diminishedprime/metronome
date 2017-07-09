import React from 'react'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'

const style = {
  fontFamily: 'Helvetica',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
}

const App = () => (
  <div style={style}>
    <HUD />
    <Controls />
  </div>
)
export default App
