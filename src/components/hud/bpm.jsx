import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import {
  bpmPath,
} from '../../redux/paths.js'
import {
  afAddBPM,
} from '../../redux/actions.js'


const mapStateToProps = (state) => ({
  bpm: R.view(bpmPath, state),
})

const mapDispatchToProps = (dispatch) => ({
  emitDelta: (amount) => () => dispatch(afAddBPM(amount)),
})


const bpmStyle = {
  fontSize: '3em',
}

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '0.5em',
  display: 'flex',
  justifyContent: 'center',
}

const BPM = ({ bpm, emitDelta }) => (
  <div>
    <div style={titleStyle}>BPM</div>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <div style={bpmStyle}>{bpm}</div>
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <button onClick={emitDelta(+1)}>+</button>
        <button onClick={emitDelta(-1)}>-</button>
      </div>
    </div>
  </div>
)


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BPM)
