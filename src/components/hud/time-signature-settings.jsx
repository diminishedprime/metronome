import React from 'react'
import { connect } from 'react-redux'
import {
  afShowTimeSignatureSettings,
  afChangeStyle,
} from '../../redux/actions.js'

const mapDispatchToProps = (dispatch) => ({
  showTimeSignatureSettings: (flag) => () => dispatch(afShowTimeSignatureSettings(flag)),
  changeStyle: (delta) => () => dispatch(afChangeStyle(delta)),
})
const buttonStyle = {height: '40px', width: '40px'}

const TimeSignatureSettings = ({showTimeSignatureSettings, changeStyle}) => (
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: ' 5px',
    position: 'relative',
  }}>
    <button style={buttonStyle}
      onClick={changeStyle(1)}>+</button>
    <button style={buttonStyle}
      onClick={changeStyle(-1)}>-</button>
    <button style={buttonStyle}
      onClick={showTimeSignatureSettings(false)}>x</button>
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(TimeSignatureSettings)
