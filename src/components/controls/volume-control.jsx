import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import VerticalSlider from './vertical-slider.jsx'
import {afSetVolume, afToggleMute} from '../../redux/actions.js'
import {noteDisplayOrder} from '../../constants.js'
import {volumePathFor, mutePathFor} from '../../redux/paths.js'

const mapStateToProps = (state) => ({
  volume: (type) => R.view(volumePathFor(type), state),
  mute: (type) => R.view(mutePathFor(type), state),
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (type) => (value) =>
    dispatch(afSetVolume(volumePathFor(type), value)),
  toggleMute: (type) => () => dispatch(afToggleMute(mutePathFor(type))),
})

const VolumeControl = ({toggleMute, onChange, volume, mute}) => (
  <div style={{display: 'flex'}}>
    {noteDisplayOrder.map((type, idx) => (
      <div key={`volumeControl${idx}`} style={{margin: '5px'}}>
        <div
          style={{
            lineHeight: '12pt',
            fontFamily: 'Bravura',
            display: 'flex',
            justifyContent: 'center',
            color: mute(type) ? 'red' : undefined,
          }}
        >
          {type}
        </div>
        <div
          style={{height: '150px', display: 'flex', justifyContent: 'center'}}
        >
          <VerticalSlider onChange={onChange(type)} value={volume(type)} />
        </div>
        <input
          type="checkbox"
          onChange={toggleMute(type)}
          checked={mute(type)}
        />
      </div>
    ))}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControl)
