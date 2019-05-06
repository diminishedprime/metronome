import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import {over, set} from 'ramda'
import * as R from 'ramda'
import TempoMarking from './TempoMarking'
import TimeSignature from './TimeSignature'
import {SchedulerState} from './types'
import {useMetronome} from './metronome'
import TapIn from './TapIn'

interface State {
  schedulerState: SchedulerState
}

const subDivisionsL = (idx: number) =>
  R.lensPath(['schedulerState', 'subDivisions', idx, 'on'])

const bpmL = R.lensPath(['schedulerState', 'bpm'])

const makeInitialState = (): State => ({
  schedulerState: {
    audioContext: new AudioContext(),
    bpm: 63,
    signature: {
      numerator: 5,
      denominator: 4,
    },
    subDivisions: [
      {on: false, pitch: 880, divisions: 2, label: '2', gain: 1.0},
      {on: false, pitch: 880, divisions: 3, label: '3', gain: 1.0},
      {on: false, pitch: 880, divisions: 4, label: '4', gain: 1.0},
      {on: false, pitch: 880, divisions: 5, label: '5', gain: 1.0},
      {on: false, pitch: 880, divisions: 6, label: '6', gain: 1.0},
      {on: false, pitch: 880, divisions: 7, label: '7', gain: 1.0},
      {on: false, pitch: 880, divisions: 8, label: '8', gain: 1.0},
    ],
  },
})

const Metronome = () => {
  const [playing, setPlaying] = useState(false)
  const [currentBeat, setCurrentBeat] = useState(0)
  const [nextBeats, setNextBeats] = useState([])
  const [
    {
      schedulerState,
      schedulerState: {
        bpm,
        subDivisions,
        signature,
        signature: {numerator},
      },
    },
    setState,
  ] = useState(makeInitialState)

  const addBeatTime = (time: number) => {
    setNextBeats(R.append(time))
  }
  const updateCurrentBeat = (now: number, pastBeats: number[]) => {
    setCurrentBeat((beat: number) => {
      let next = beat + pastBeats.length
      if (next > numerator) {
        next = next % numerator
      }
      return next
    })
    setNextBeats(R.dropWhile((time) => time < now))
  }

  const changeBPM = (diff: number) => () =>
    setState(
      over(
        bpmL,
        R.pipe(
          R.add(diff),
          R.clamp(1, 250)
        )
      )
    )

  const setBPM = (bpm: number) => setState(set(bpmL, R.clamp(1, 250, bpm)))

  const toggleSubDivision = (divisionIdx: number) => () => {
    setState(over(subDivisionsL(divisionIdx), R.not))
  }

  const toggleStart = () => {
    if (playing) {
      setNextBeats([])
      setCurrentBeat(0)
    }
    setPlaying(R.not)
  }

  useMetronome(
    playing,
    schedulerState,
    nextBeats,
    addBeatTime,
    updateCurrentBeat
  )

  return (
    <>
      <div style={{display: 'flex'}}>
        <TimeSignature signature={signature} />
        {R.range(0, signature.numerator).map((beat) => (
          <div
            key={beat}
            style={{
              height: 10,
              width: 10,
              margin: 10,
              backgroundColor: beat + 1 === currentBeat ? 'green' : 'black',
            }}
          />
        ))}
      </div>
      <div>bpm: {bpm}</div>
      <div>playing: {playing + ''}</div>
      <div>
        <TapIn setBPM={setBPM} />
      </div>
      <div>
        {subDivisions.map(({label, on}, idx) => (
          <div key={label}>
            <label>{label}</label>
            <input
              type="checkbox"
              checked={on}
              onChange={toggleSubDivision(idx)}
            />
          </div>
        ))}
      </div>
      <div>
        <button onClick={changeBPM(-1)}>-1</button>
        <button onClick={changeBPM(-10)}>-10</button>
        <button onClick={changeBPM(10)}>+10</button>
        <button onClick={changeBPM(1)}>+1</button>
      </div>
      <div>
        <button onClick={toggleStart}>{playing ? 'Stop' : 'Start'}</button>
      </div>
      <TempoMarking bpm={bpm} />
    </>
  )
}

const Layout = styled.div`
  margin: 0 auto;
  max-width: 40em;
`

const App: React.FC = () => {
  return (
    <Layout>
      <Metronome />
    </Layout>
  )
}

export default App
