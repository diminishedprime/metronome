import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import {
  bpmPath,
  styleIndexPath,
  stylePath,
  beatPath,
  showTimeSignatureSettingsPath,
  editingBPMPath,
} from '../../redux/paths.js'
import {
  afShowTimeSignatureSettings,
  afSetEditingBPM,
  afSetBPM,
} from '../../redux/actions.js'
import TimeSignatureSettings from './time-signature-settings.jsx'

const mapStateToProps = (state) => {
  const style = R.view(stylePath, state)[R.view(styleIndexPath, state)]

  return ({
    editingBPM: R.view(editingBPMPath, state),
    bpm: R.view(bpmPath, state),
    styleName: style.name,
    beat: R.view(beatPath, state),
    shouldShowTimeSignatureSettings: R.view(showTimeSignatureSettingsPath, state),
  })
}

const mapDispatchToProps = (dispatch) => ({
  showTimeSignatureSettings: (flag) => () => dispatch(afShowTimeSignatureSettings(flag)),
  setEditingBPM: (flag) => () => dispatch(afSetEditingBPM(flag)),
  setBPM: (value) => dispatch(afSetBPM(value)),
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
  editingBPM,
  setEditingBPM,
  setBPM,
}) => (
  <div style={hudStyle}>
    <div onClick={setEditingBPM(true)}>
      <div style={titleStyle}>BPM</div>
      {
        editingBPM ? <input type="number"
          autoFocus
          value={bpm}
          onChange={({target: {value}}) => setBPM(value)}
          style={R.merge(bpmStyle, {width: '100px'})}
          onBlur={setEditingBPM(false)}
          placeholder="edit me"/>
          : <div style={bpmStyle}>{bpm}</div>
      }
    </div>
    <div style={sigContainerStyle} onClick={showTimeSignatureSettings(true)}>
      {beat &&
       <div style={sigStyle}>
         <div style={titleStyle}>Beat</div>
         <div style={bpmStyle}>{beat}</div>
       </div>
      }
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
