import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import VerticalSlider from './vertical-slider.jsx'
import { afSetVolume, afToggleMute } from '../../redux/actions.js'
import {
  masterMutePath,
  accentMutePath,
  quarterMutePath,
  eighthMutePath,
  sixteenthMutePath,
  tripletMutePath,
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
  masterMute: R.view(masterMutePath, state),
  accentMute: R.view(accentMutePath, state),
  quarterMute: R.view(quarterMutePath, state),
  eighthMute: R.view(eighthMutePath, state),
  sixteenthMute: R.view(sixteenthMutePath, state),
  tripletMute: R.view(tripletMutePath, state),
})


const mapDispatchToProps = (dispatch) => ({
  onChange: (path) => (value) => dispatch(afSetVolume(path, value)),
  toggleMute: (path) => () => dispatch(afToggleMute(path)),
})

const VolumeControl = ({
  toggleMute,
  onChange,
  quarterVolume,
  masterVolume,
  eighthVolume,
  sixteenthVolume,
  tripletVolume,
  accentVolume,
  tripletMute,
  sixteenthMute,
  eighthMute,
  quarterMute,
  accentMute,
  masterMute,
}) => (
  <div style={{display:'flex'}}>
    {
      [
        ['\uE1F1\uE1F3\uE1F3', onChange(tripletVolumePath), tripletVolume, toggleMute(tripletMutePath), tripletMute],
        ['\uE1D9', onChange(sixteenthVolumePath), sixteenthVolume, toggleMute(sixteenthMutePath), sixteenthMute],
        ['\uE1D7', onChange(eighthVolumePath), eighthVolume, toggleMute(eighthMutePath), eighthMute],
        ['\uE1D5', onChange(quarterVolumePath), quarterVolume, toggleMute(quarterMutePath, quarterMute)],
        ['\uE4A0', onChange(accentVolumePath), accentVolume, toggleMute(accentMutePath), accentMute],
        ['M', onChange(masterVolumePath), masterVolume, toggleMute(masterMutePath), masterMute],
      ].map(([title, onChange, value, toggleMute, muted], idx) => (
        <div key={`volumeControl${idx}`}style={{margin: '5px'}}>
          <div style={{height: '40px', fontFamily: 'Bravura', display: 'flex', justifyContent: 'center', color: (muted ? 'red' : undefined)}}>
            {title}
          </div>
          <div style={{height: '150px', display: 'flex', justifyContent: 'center'}}>
            <VerticalSlider onChange={onChange} value={value} />
          </div>
          <input
            type="checkbox"
            onChange={toggleMute}
            checked={muted}
          />
        </div>
      ))
    }
  </div>
)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VolumeControl)
