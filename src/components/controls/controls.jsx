import React from 'react'
import { connect } from 'react-redux'
import { afAddBPM } from '../../redux/actions.js'
import InfiniKnob from './infini-knob.jsx'
import ButtonRow from './button-row.jsx'

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}

const Controls = ({emitDelta}) => (
  <div style={style}>
    <InfiniKnob emitDelta={emitDelta}/>
    <ButtonRow />
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(Controls)
