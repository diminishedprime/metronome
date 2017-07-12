import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { bpmPath, beatsPerBarPath, beatPath } from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  bpm: R.view(bpmPath, state),
  beatsPerBar: R.view(beatsPerBarPath, state),
  beat: R.view(beatPath, state),
})

const hudStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: '3px solid #f6f8fa',
  width: 'auto',
}

const bpmStyle = {
  fontSize: '3em',
}

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '0.5em',
  display: 'flex',
  justifyContent: 'center',
}

const sigStyle = {
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2px',
}

const HUD = ({bpm, beatsPerBar, beat}) => (
  <div style={hudStyle}>
    <div>
      <div style={titleStyle}>BPM</div>
      <div style={bpmStyle}>{bpm}</div>
    </div>
    <div style={{display:'flex'}}>
      <div style={sigStyle}>
        <div style={titleStyle}>Beat</div>
        <div>{beat}</div>
      </div>
      <div style={sigStyle}>
        <div style={titleStyle}>Style</div>
        <div>{beatsPerBar}</div>
      </div>
    </div>
  </div>
)


export default connect(
  mapStateToProps
)(HUD)
