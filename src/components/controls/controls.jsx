import React from 'react'
import { connect } from 'react-redux'
import { afAddBPM } from '../../redux/actions.js'
import InfiniKnob from './infini-knob.jsx'
import ButtonRow from './button-row.jsx'
import VerticalSlider from './vertical-slider.jsx'

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const VolumeControl = () => (
  <div style={{display:'flex'}}>
    <VerticalSlider title={'♩'} />
    <VerticalSlider title={'Vol'} />
    {/* <VerticalSlider title={'♪'} /> */}
  </div>
)

const Controls = ({emitDelta}) => (
  <div style={style}>
    <InfiniKnob emitDelta={emitDelta}/>
    <VolumeControl />
    <ButtonRow />
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(Controls)
