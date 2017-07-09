import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import VerticalSlider from './vertical-slider.jsx'
import { afSetVolume } from '../../redux/actions.js'
import {
  masterVolumePath,
  quarterVolumePath,
  eighthVolumePath,
} from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  eighthVolume: R.view(eighthVolumePath, state),
  quarterVolume: R.view(quarterVolumePath, state),
  masterVolume: R.view(masterVolumePath, state),
})


const mapDispatchToProps = (dispatch) => ({
  onChange: (path) => (value) => dispatch(afSetVolume(path, value)),
})

const VolumeControl = ({onChange, quarterVolume, masterVolume, eighthVolume}) => (
  <div style={{display:'flex'}}>
    <VerticalSlider title={'♪'} onChange={onChange(eighthVolumePath)} value={eighthVolume} />
    <VerticalSlider title={'♩'} onChange={onChange(quarterVolumePath)} value={quarterVolume}/>
    <VerticalSlider title={'Vol'} onChange={onChange(masterVolumePath)} value={masterVolume} />

  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeControl)
