import React from 'react'
import {useState} from 'react'
import styled from 'styled-components'
import {over, set} from 'ramda'
import * as R from 'ramda'
import TempoMarking from './TempoMarking'
import TimeSignature from './TimeSignature'
import {SchedulerState, SubDivisions} from './types'
import {useMetronome} from './metronome'

interface State {
  currentBeat: number
  nextBeats: number[]
  tapTimes: number[]
  schedulerState: SchedulerState
}

const nextBeatsL = R.lensPath(['nextBeats'])
const currentBeatL = R.lensPath(['currentBeat'])
const subDivisionsL = (division: string) =>
  R.lensPath(['schedulerState', 'subDivisions', division, 'on'])
const bpmL = R.lensPath(['schedulerState', 'bpm'])
const tapTimesL = R.lensPath(['tapTimes'])
const topL = R.lensPath([])

const makeInitialState = (): State => ({
  tapTimes: [],
  currentBeat: 0,
  nextBeats: [],
  schedulerState: {
    bpm: 63,
    scheduleAheadTimeSeconds: 0.1,
    signature: {
      numerator: 5,
      denominator: 4,
    },
    subDivisions: {
      _2: {on: false, pitch: 880, divisions: 2, label: '2'},
      _3: {on: false, pitch: 880, divisions: 3, label: '3'},
      _4: {on: false, pitch: 880, divisions: 4, label: '4'},
      _5: {on: false, pitch: 880, divisions: 5, label: '5'},
      _6: {on: false, pitch: 880, divisions: 6, label: '6'},
      _7: {on: false, pitch: 880, divisions: 7, label: '7'},
      _8: {on: false, pitch: 880, divisions: 8, label: '8'},
    },
  },
})

const calculateBPM: (tapTimes: number[]) => number = R.pipe(
  (tapTimes: number[]) => R.aperture(2, tapTimes),
  R.map(([a, b]: [number, number]) => a - b),
  R.mean,
  R.divide(60000),
  Math.trunc
)

const addNow = (tapTimes: number[]) =>
  R.pipe(
    R.prepend(performance.now()),
    R.take(5)
  )(tapTimes)

type SetState = (prevState: State) => State

const Metronome = () => {
  const [playing, setPlaying] = useState(false)
  const [
    {
      schedulerState,
      currentBeat,
      nextBeats,
      schedulerState: {
        bpm,
        subDivisions,
        signature,
        signature: {numerator},
      },
    },
    setState,
  ] = useState(makeInitialState)

  const nextBeat = (time: number) => {
    setState(over(nextBeatsL, R.append(time)))
  }
  const updateCurrentBeat = (now: number, pastBeats: number[]) =>
    setState(
      R.pipe(
        over(currentBeatL, (beat) => (beat + pastBeats.length) % numerator),
        over(nextBeatsL, R.dropWhile((time) => time < now))
      )
    )

  const changeBPM = (diff: number) => () =>
    setState(
      R.pipe(
        over(
          bpmL,
          R.pipe(
            R.add(diff),
            R.clamp(1, 250)
          )
        ),
        set(tapTimesL, [])
      )
    )

  const toggleSubDivision = (division: string) => () => {
    setState(over(subDivisionsL(division), R.not))
  }

  const toggleStart = () => {
    if (!playing) {
      const fns = [set(nextBeatsL, []), set(currentBeatL, 0)]
      const applied = (R.apply(R.pipe, fns) as unknown) as SetState
      setState(applied)
    }
    setPlaying(R.not)
  }

  const tapTimesBasedBPM = (state: State) => {
    const {tapTimes} = state
    if (tapTimes.length < 2) {
      return state
    } else {
      return set(bpmL, calculateBPM(tapTimes), state)
    }
  }
  const onTap = () =>
    setState(
      R.pipe(
        over(tapTimesL, addNow),
        over(topL, tapTimesBasedBPM)
      )
    )

  useMetronome(playing, schedulerState, nextBeats, nextBeat, updateCurrentBeat)

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
              backgroundColor: beat === currentBeat ? 'green' : 'black',
            }}
          />
        ))}
      </div>
      <div>bpm: {bpm}</div>
      <div>playing: {playing + ''}</div>
      <div>
        <button onClick={onTap}>Tap</button>
      </div>
      <div>
        {Object.keys(subDivisions).map((key) => {
          const division = key as keyof SubDivisions
          const {label, on} = subDivisions[division]
          return (
            <div key={division}>
              <label>{label}</label>
              <input
                type="checkbox"
                checked={on}
                onChange={toggleSubDivision(division)}
              />
            </div>
          )
        })}
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
