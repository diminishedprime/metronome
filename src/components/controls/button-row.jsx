import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  afStopMetronome,
  afStartMetronome,
  afTapIn,
  afToggleVolumeControl,
} from '../../redux/actions.js'
import {
  playingPath,
  audioContextPath,
  volumeControlPath,
} from '../../redux/paths.js'

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
  onClick: playing
    ? stop
    : () => {
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

const ShowVolumeControl = connect(
  (state) => ({showVolumeControl: R.view(volumeControlPath, state)}),
  (dispatch) => ({setVolumeControl: () => dispatch(afToggleVolumeControl())})
)(({setVolumeControl}) => (
  <button
    style={R.merge(baseButtonStyle, {flexGrow: '1'})}
    onClick={setVolumeControl}
  >
    <span role="img" aria-label="show volume control">
      🔊
    </span>
  </button>
))

const TapIn = connect(undefined, mapDispatchToProps)(({tap}) => (
  <button style={R.merge(baseButtonStyle, {flexGrow: '1'})} onClick={tap}>
    Tap
  </button>
))

const StartStop = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeStateDispatch
)(({onClick, text}) => (
  <button style={R.merge(baseButtonStyle, {flexGrow: '3'})} onClick={onClick}>
    {text}
  </button>
))

const buttonRowStyle = {
  display: 'flex',
}

const ButtonRow = () => (
  <div style={buttonRowStyle}>
    <ShowVolumeControl />
    <StartStop />
    <TapIn />
  </div>
)

export default ButtonRow
