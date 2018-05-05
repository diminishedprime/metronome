import React from 'react'
import BPM from './bpm.jsx'
import TimeSignature from './time-signature.jsx'

const hudStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const HUD = () => (
  <div style={hudStyle}>
    <BPM />
  </div>
)

export default HUD
