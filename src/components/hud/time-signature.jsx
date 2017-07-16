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
  display:'flex',
}

const sigStyle = {
  display:'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2px',
}

const HUD = ({
  styleName,
  beat,
  showTimeSignatureSettings,
}) => (
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
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HUD)
