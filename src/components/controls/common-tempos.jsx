import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {bpmPath} from '../../redux/paths.js'
import {afSetBPM} from '../../redux/actions.js'

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

const mapStateToProps = (state) => ({
  bpm: R.view(bpmPath, state),
})

const mapDispatchToProps = (dispatch) => ({
  setBpm: (bpm) => dispatch(afSetBPM(bpm)),
})

const style = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  flexWrap: 'wrap',
}

const Tempo = ({name, from, to, setBpm, currentTempo}) => {
  const inRange = currentTempo >= from && currentTempo <= to
  const bpm = Math.round((from + to) / 2)
  return (
    <div
      onClick={(e) => {
        const {clientX, target} = e
        const {width, right} = target.getBoundingClientRect()
        const fraction = 1 - (right - clientX) / width
        const bpm = Math.round(fraction * (to - from) + from)
        setBpm(bpm)
      }}
      style={{
        minWidth: '100px',
        flexGrow: '1',
        opacity: inRange ? '1.0' : '0.5',
        paddingTop: '5px',
        paddingBottom: '5px',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: `hsl(${(bpm - 25) / 200 * 120}, 100%, 50%)`,
        position: 'relative',
      }}
    >
      {inRange && (
        <div
          style={{
            position: 'absolute',
            top: '0',
            left: `${Math.round(
              (1 - (to - currentTempo) / (to - from)) * 100
            )}%`,
            width: '1px',
            height: '100%',
            backgroundColor: `hsl(${120 + (bpm - 25) / 200 * 120}, 100%, 50%)`,
          }}
        />
      )}
      <div style={{fontWeight: 'bold'}}>
        {from}-{to}
      </div>
      <div style={{fontSize: '0.75em'}}>{name}</div>
    </div>
  )
}

const CommonTempos = ({setBpm, bpm}) => (
  <div style={style}>
    {tempos.map((tempo, idx) => (
      <Tempo
        key={`tempo${idx}`}
        {...tempo}
        setBpm={setBpm}
        currentTempo={bpm}
      />
    ))}
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(CommonTempos)
