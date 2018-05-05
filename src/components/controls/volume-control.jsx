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
  effectiveMute: (type) =>
    R.view(mutePathFor(type), state) ||
    R.view(volumePathFor(type), state) === 0,
})

const mapDispatchToProps = (dispatch) => ({
  onChange: (type) => (value) =>
    dispatch(afSetVolume(volumePathFor(type), value)),
  toggleMute: (type) => () => dispatch(afToggleMute(mutePathFor(type))),
})

const VolumeControl = ({toggleMute, onChange, volume, mute, effectiveMute}) => (
  <div style={{display: 'flex', justifyContent: 'space-between'}}>
    {noteDisplayOrder.map((type, idx) => (
      <div
        key={`volumeControl${idx}`}
        style={{
          margin: '5px',
        }}
      >
        <div
          style={{
            lineHeight: '12pt',
            fontFamily: 'Bravura',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {type}
        </div>
        <div
          style={{height: '250px', display: 'flex', justifyContent: 'center'}}
        >
          <VerticalSlider
            onChange={onChange(type)}
            overhangPercentage={100}
            value={volume(type)}
            sliderHeight={10}
          />
        </div>
        <button onClick={toggleMute(type)}>
          {effectiveMute(type) ? '🔇' : '🔊'}
        </button>
      </div>
    ))}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(VolumeControl)
