import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import { afSetBPM } from '../../redux/actions.js'

const tempos = [
  {
    name: 'Grave',
    bpms: '25–45',
    bpm: 25,
  }, {
    name: 'Largo',
    bpms: '40–60',
    bpm: 40,
  }, {
    name: 'Lento',
    bpms: '45–60',
    bpm: 45,
  }, {
    name: 'Larghetto',
    bpms: '60–66',
    bpm: 60,
  }, {
    name: 'Adagio',
    bpms: '66–76',
    bpm: 66,
  }, {
    name: 'Andante',
    bpms: '76–108',
    bpm: 76,
  }, {
    name: 'Moderato',
    bpms: '108–120',
    bpm: 108,
  }, {
    name: 'Allegretto',
    bpms: '112–120',
    bpm: 112,
  }, {
    name: 'Allegro moderato',
    bpms: '116–120',
    bpm: 116,
  }, {
    name: 'Allegro',
    bpms:'120–168',
    bpm: 120,
  }, {
    name: 'Vivace',
    bpms: '168–176',
    bpm: 168,
  }, {
    name: 'Presto',
    bpms: '168–200',
    bpm: 168,
  },
]

const mapDispatchToProps = (dispatch) => ({
  setBpm: (bpm) => () => dispatch(afSetBPM(bpm)),
})

const style = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
}

const grouping = 4

const Tempo = ({name, bpms, bpm, setBpm}) => (
  <div onClick={setBpm(bpm)} style={{padding: '5px', cursor: 'pointer', display: 'flex', flexDirection: 'column', border: '3px solid #f6f8fa', alignItems: 'center', width: `${(1/grouping)*100}%`, backgroundColor: `hsl(${((bpm-25)/200)*120}, 100%, 50%)`}}>
    <div style={{fontWeight: 'bold'}}>{bpms}</div>
    <div style={{fontSize: '0.75em'}}>{name}</div>
  </div>
)

const CommonTempos = ({setBpm}) => (
  <div style={style}>
    {
      R.pipe(
        R.splitEvery(grouping),
        R.addIndex(R.map)(((group, idx2) => (
          <div key={`tempoThing${idx2}`}style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
            {
              group
                .map((tempo, idx) => (
                  <Tempo key={`tempo${idx}${idx2}`} {...tempo} setBpm={setBpm} />
                ))
            }
          </div>
        ))))(tempos)
    }
  </div>
)

          export default connect(
            undefined,
            mapDispatchToProps
)(CommonTempos)
