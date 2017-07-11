import React from 'react'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import CommonTempos from '../controls/common-tempos.jsx'

const style = {
  fontFamily: 'Helvetica',
  margin: 'auto',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '500px',
}

const App = () => (
  <div style={style}>
    <CommonTempos />
    <HUD />
    <Controls />
  </div>
)
export default App
