import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {bpmPath, wheelControlPath, beatLengthPath} from '../../redux/paths.js'
import {
  afAddBPM,
  afSetBPM,
  afToggleWheelControl,
  afSetBeatLength,
} from '../../redux/actions.js'
import InfiniKnob from '../controls/infini-knob.jsx'
import TimeSignature from './time-signature.jsx'
import {half, quarter, eighth, sixteenth} from '../../constants.js'

const tempos = [
  {name: 'Grave', from: 25, to: 45},
  {name: 'Largo', from: 40, to: 60},
  {name: 'Lento', from: 45, to: 60},
  {name: 'Larghetto', from: 60, to: 66},
  {name: 'Adagio', from: 66, to: 76},
  {name: 'Andante', from: 76, to: 108},
  {name: 'Moderato', from: 108, to: 120},
  {name: 'Allegretto', from: 112, to: 120},
  {name: 'Allegro moderato', from: 116, to: 120},
  {name: 'Allegro', from: 120, to: 168},
  {name: 'Vivace', from: 168, to: 176},
  {name: 'Presto', from: 168, to: 200},
]

const getTempoForBpm = (bpm) => {
  if (bpm >= 200) {
    return tempos[tempos.length - 1]
  } else if (bpm <= 25) {
    return tempos[0]
  } else {
    return tempos.find(({from, to}) => bpm >= from && bpm <= to)
  }
}

const mapStateToProps = (state) => ({
  bpm: R.view(bpmPath, state),
  currentTempo: getTempoForBpm(R.view(bpmPath, state)).name,
  showWheelControl: R.view(wheelControlPath, state),
  beatLength: R.view(beatLengthPath, state),
})

const mapDispatchToProps = (dispatch) => ({
  emitDeltaAmount: (amount) => () => dispatch(afAddBPM(amount)),
  emitDelta: (amount) => dispatch(afAddBPM(amount)),
  setBpm: (bpm) => dispatch(afSetBPM(bpm)),
  setWheelControl: () => dispatch(afToggleWheelControl()),
  onBeatLength: (e) => {
    const beatLength = e.target.value
    dispatch(afSetBeatLength(beatLength))
  },
})

const bpmStyle = {
  fontSize: '7em',
}

const titleStyle = {
  fontWeight: 'bold',
  fontSize: '1em',
  display: 'flex',
  justifyContent: 'center',
}

const bpmContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
}

const buttonsStyle = {
  display: 'flex',
  flexDirection: 'column',
}

const buttonStyle = {
  margin: '0.25em',
  padding: '0.5em',
}

const tempoNameStyle = {
  fontSize: '1em',
  display: 'flex',
  justifyContent: 'center',
}

const Buttons = ({emitDelta}) => (
  <div style={buttonsStyle}>
    <button style={buttonStyle} onClick={emitDelta(+1)}>
      +
    </button>
    <button style={buttonStyle} onClick={emitDelta(-1)}>
      -
    </button>
  </div>
)

const TempoName = ({setBpm, currentTempo}) => (
  <div style={tempoNameStyle}>
    <select
      style={{textAlign: 'center', textAlignLast: 'center'}}
      value={currentTempo}
      onChange={(e) => {
        const tempoName = e.target.value
        const tempo = tempos.find(({name}) => name === tempoName)
        const newBpm = Math.floor((tempo.from + tempo.to) / 2)
        setBpm(newBpm)
      }}
    >
      {tempos.map(({name, from, to}) => (
        <option key={name} value={name}>
          {name} ({from}-{to})
        </option>
      ))}
    </select>
  </div>
)

const BPM = ({
  bpm,
  emitDelta,
  emitDeltaAmount,
  currentTempo,
  setBpm,
  showWheelControl,
  setWheelControl,
  onBeatLength,
  beatLength,
}) => (
  <div style={bpmContainerStyle}>
    <TempoName setBpm={setBpm} currentTempo={currentTempo} />
    <div style={{display: 'flex', alignItems: 'center', marginTop: '1em'}}>
      <div
        style={{
          lineHeight: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div style={titleStyle}>
          {[half, quarter, eighth, sixteenth].map((name) => (
            <label
              key={`${name}label`}
              style={{fontSize: '2em', fontFamily: 'Bravura'}}
            >
              {name}
              <input
                key={`${name}input`}
                type="radio"
                value={name}
                style={{margin: '20px', transform: 'scale(3)'}}
                checked={name === beatLength}
                onChange={onBeatLength}
              />
            </label>
          ))}
        </div>
        <div onClick={setWheelControl} style={bpmStyle}>
          {bpm}
        </div>
      </div>
      <Buttons emitDelta={emitDeltaAmount} />
    </div>
    <TimeSignature />
    {showWheelControl && <InfiniKnob emitDelta={emitDelta} />}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(BPM)
