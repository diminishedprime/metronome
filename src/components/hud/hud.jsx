import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { bpmPath } from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  bpm: R.view(bpmPath, state),
})

const hudStyle = {
  display: 'flex',
}

const bpmStyle = {
  fontSize: '3em',
}

const HUD = ({bpm}) => (
  <div style={hudStyle}>
    <div style={bpmStyle}>{bpm}</div>
  </div>
)


export default connect(
  mapStateToProps
)(HUD)
