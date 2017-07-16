import React from 'react'
import { connect } from 'react-redux'
import { afAddBPM } from '../../redux/actions.js'
import InfiniKnob from './infini-knob.jsx'
import ButtonRow from './button-row.jsx'
import VolumeControl from './volume-control.jsx'

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const style = {
  display: 'flex',
  flexWrap: 'wrap',
}

const infiniKnobStyle = {
  marginLeft: 'auto',
  alignSelf: 'center',
}

const Controls = ({emitDelta}) => (
  <div>
    <div style={style}>
      <VolumeControl />
      <InfiniKnob style={infiniKnobStyle} emitDelta={emitDelta} size={200}/>
    </div>
    <ButtonRow />
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(Controls)
