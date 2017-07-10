import React from 'react'
import { connect } from 'react-redux'
import { afAddBPM } from '../../redux/actions.js'
import InfiniKnob from './infini-knob.jsx'
import ButtonRow from './button-row.jsx'
import VolumeControl from './volume-control.jsx'
import CommonTempos from './common-tempos.jsx'

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: '10px',
}

const Controls = ({emitDelta}) => (
  <div style={style}>
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <VolumeControl />
      <InfiniKnob emitDelta={emitDelta} size={200}/>
    </div>
    <ButtonRow />
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(Controls)
