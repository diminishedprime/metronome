import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import {
  bpmPath,
  styleIndexPath,
  stylePath,
  beatPath,
  showTimeSignatureSettingsPath,
} from '../../redux/paths.js'
import {
  afShowTimeSignatureSettings,
} from '../../redux/actions.js'
import TimeSignatureSettings from './time-signature-settings.jsx'

const mapStateToProps = (state) => {
  const style = R.view(stylePath, state)[R.view(styleIndexPath, state)]

  return ({
    bpm: R.view(bpmPath, state),
    styleName: style.name,
    beat: R.view(beatPath, state),
    shouldShowTimeSignatureSettings: R.view(showTimeSignatureSettingsPath, state),
  })
}

const mapDispatchToProps = (dispatch) => ({
  showTimeSignatureSettings: (flag) => () => dispatch(afShowTimeSignatureSettings(flag)),
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

const sigContainerStyle = {
  position: 'relative',
  border: '3px solid #f6f8fa',
  display:'flex',
}

const sigStyle = {
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2px',
}


const HUD = ({
  bpm,
  styleName,
  beat,
  shouldShowTimeSignatureSettings,
  showTimeSignatureSettings,
}) => (
  <div style={hudStyle}>
    <div>
      <div style={titleStyle}>BPM</div>
      <div style={bpmStyle}>{bpm}</div>
    </div>
    <div style={sigContainerStyle} onClick={showTimeSignatureSettings(true)}>
      <div style={sigStyle}>
        <div style={titleStyle}>Beat</div>
        <div style={bpmStyle}>{beat}</div>
      </div>
      <div style={sigStyle}>
        <div style={titleStyle}>Style</div>
        <div style={bpmStyle}>{styleName}</div>
      </div>
    </div>
    {shouldShowTimeSignatureSettings && <TimeSignatureSettings showTimeSignatureSettings={showTimeSignatureSettings}/>}
  </div>
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HUD)
