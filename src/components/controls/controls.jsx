import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {afAddBPM, afToggleVolumeControl} from '../../redux/actions.js'
import {volumeControlPath} from '../../redux/paths.js'
import ButtonRow from './button-row.jsx'
import VolumeControl from './volume-control.jsx'

const mapStateToProps = (state) => ({
  showVolumeControl: R.view(volumeControlPath, state),
})

const mapDispatchToProps = (dispatch) => ({
  setVolumeControl: () => dispatch(afToggleVolumeControl()),
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const controlsStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const Controls = ({showVolumeControl}) => (
  <div style={controlsStyle}>
    <ButtonRow />
    {showVolumeControl && <VolumeControl />}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
