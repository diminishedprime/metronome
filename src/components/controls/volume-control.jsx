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
    {
      [
        ['\uE1F1\uE1F3\uE1F3', onChange(tripletVolumePath), tripletVolume],
        ['\uE1D9', onChange(sixteenthVolumePath), sixteenthVolume],
        ['\uE1D7', onChange(eighthVolumePath), eighthVolume],
        ['\uE1D5', onChange(quarterVolumePath), quarterVolume],
        ['\uE4A0', onChange(accentVolumePath), accentVolume],
        ['M', onChange(masterVolumePath), masterVolume],
      ].map(([title, onChange, value], idx) => (
        <div key={`volumeControl${idx}`}style={{margin: '5px'}}>
          <div style={{height: '40px', fontFamily: 'Bravura', display: 'flex', justifyContent: 'center'}}>
            {title}
          </div>
          <div style={{height: '150px', display: 'flex', justifyContent: 'center'}}>
            <VerticalSlider onChange={onChange} value={value} />
          </div>
        </div>
      ))
    }
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeControl)
