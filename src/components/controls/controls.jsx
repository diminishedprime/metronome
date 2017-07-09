import React from 'react'
import { connect } from 'react-redux'
import { afAddBPM } from '../../redux/actions.js'
import StartStop from './start-stop.jsx'
import InfiniKnob from './infini-knob.jsx'
import TapIn from './tap-in.jsx'

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
})

const Controls = ({emitDelta}) => (
  <div>
    <InfiniKnob emitDelta={emitDelta}/>
    <StartStop />
    <TapIn />
  </div>
)

export default connect(
  undefined,
  mapDispatchToProps
)(Controls)
