import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { afStopMetronome, afStartMetronome, afTapIn } from '../../redux/actions.js'
import { playingPath } from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  playing: R.view(playingPath, state),
})


const mapDispatchToProps = (dispatch) => ({
  stop: () => dispatch(afStopMetronome()),
  start: () => dispatch(afStartMetronome()),
  tap: () => dispatch(afTapIn()),
})

const mergeStateDispatch = ({playing}, {stop, start}) => ({
  onClick: playing ? stop : start,
  text: playing ? 'Stop' : 'Start',
})

const baseButtonStyle = {
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
  width: '100%',
}

const ButtonRow = () => (
  <div style={buttonRowStyle}>
    <StartStop />
    <TapIn />
  </div>
)

export default ButtonRow
