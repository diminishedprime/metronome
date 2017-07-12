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
  flexDirection: 'column',
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
}

const HUD = ({bpm, beatsPerBar, beat}) => (
  <div style={hudStyle}>
    <div>
      <div style={titleStyle}>BPM</div>
      <div style={bpmStyle}>{bpm}</div>
    </div>
    <div>
      <div style={titleStyle}>Style</div>
      <div>{beat}/{beatsPerBar}</div>
    </div>
  </div>
)


export default connect(
  mapStateToProps
)(HUD)
