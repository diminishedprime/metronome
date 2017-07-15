import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import VerticalSlider from './vertical-slider.jsx'
import { afSetVolume } from '../../redux/actions.js'
import {
  masterVolumePath,
  accentVolumePath,
  quarterVolumePath,
  eighthVolumePath,
  sixteenthVolumePath,
  tripletVolumePath,
} from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  tripletVolume: R.view(tripletVolumePath, state),
  sixteenthVolume: R.view(sixteenthVolumePath, state),
  eighthVolume: R.view(eighthVolumePath, state),
  quarterVolume: R.view(quarterVolumePath, state),
  masterVolume: R.view(masterVolumePath, state),
  accentVolume: R.view(accentVolumePath, state),
})


const mapDispatchToProps = (dispatch) => ({
  onChange: (path) => (value) => dispatch(afSetVolume(path, value)),
})

const VolumeControl = ({
  onChange,
  quarterVolume,
  masterVolume,
  eighthVolume,
  sixteenthVolume,
  tripletVolume,
  accentVolume,
}) => (
  <div style={{display:'flex'}}>
    <VerticalSlider title={'♪♪♪'} onChange={onChange(tripletVolumePath)} value={tripletVolume} />
    <VerticalSlider title={'♬'} onChange={onChange(sixteenthVolumePath)} value={sixteenthVolume} />
    <VerticalSlider title={'♪♪'} onChange={onChange(eighthVolumePath)} value={eighthVolume} />
    <VerticalSlider title={'♩'} onChange={onChange(quarterVolumePath)} value={quarterVolume}/>
    <VerticalSlider title={'Vol'} onChange={onChange(masterVolumePath)} value={masterVolume} />
    <VerticalSlider title={'Acc'} onChange={onChange(accentVolumePath)} value={accentVolume} />

  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeControl)
