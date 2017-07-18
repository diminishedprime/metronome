import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { afStopMetronome, afStartMetronome, afTapIn } from '../../redux/actions.js'
import { playingPath, audioContextPath } from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  audioContext: R.view(audioContextPath, state),
  playing: R.view(playingPath, state),
})


const mapDispatchToProps = (dispatch) => ({
  stop: () => dispatch(afStopMetronome()),
  start: () => dispatch(afStartMetronome()),
  tap: () => dispatch(afTapIn()),
})

const mergeStateDispatch = ({playing, audioContext}, {stop, start}) => ({
  onClick: playing ? stop : () => {
    audioContext.createGainNode && audioContext.createGainNode()
    start()
  },
  text: playing ? 'Stop' : 'Start',
})

const baseButtonStyle = {
  margin: '5px',
  fontSize: '2.5em',
  height: '1.5em',
  display: 'flpex',
  alignItems: 'center',
  justifyContent: 'center',
}

const TapIn = connect(
  undefined,
  mapDispatchToProps
)(({tap}) => (
  <button style={R.merge(baseButtonStyle, {flexGrow: '1'})}
    onClick={tap}>
    Tap
  </button>
))

const StartStop = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeStateDispatch
)(({onClick, text}) => (
  <button style={R.merge(baseButtonStyle, {flexGrow: '3'})} onClick={onClick}>{text}</button>
))

const buttonRowStyle = {
  display: 'flex',
}

const ButtonRow = () => (
  <div style={buttonRowStyle}>
    <StartStop />
    <TapIn />
  </div>
)

export default ButtonRow
