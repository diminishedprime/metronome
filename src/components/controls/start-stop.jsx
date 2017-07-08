import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { afStopMetronome, afStartMetronome } from '../../redux/actions.js'
import { playingPath } from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  playing: R.view(playingPath, state),
})

const mapDispatchToProps = (dispatch) => ({
  stop: () => dispatch(afStopMetronome()),
  start: () => dispatch(afStartMetronome()),
})

const mergeStateDispatch = ({playing}, {stop, start}) => ({
  onClick: playing ? stop : start,
  text: playing ? 'Stop' : 'Start',
  style: {
    flexGrow: '1',
    fontSize: '3em',
    height: '4em',
  },
})

const StartStop = ({onClick, text, style}) => (
  <button style={style} onClick={onClick}>{text}</button>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeStateDispatch
)(StartStop)
