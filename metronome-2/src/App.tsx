import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {over, set} from 'ramda'
import * as R from 'ramda'
import TempoMarking from './TempoMarking'

interface SubDivision {
  on: boolean
  pitch: number
  divisions: number
  label: string
}

interface SubDivisions {
    _2: SubDivision
    _3: SubDivision
    _4: SubDivision
    _5: SubDivision
    _6: SubDivision
    _7: SubDivision
    _8: SubDivision
}

interface SchedulerState {
  bpm: number
  audioContext: AudioContext
  scheduleAheadTimeSeconds: number
  subDivisions: SubDivisions
}

interface State {
  playing: boolean
  timerId: undefined | number
  tapTimes: number[]
  schedulerState: SchedulerState
}

interface Beat {
  time: number
  pitch: number
}

const scheduleNote = (
  audioContext: AudioContext,
  noteLength: number = 0.05
) => ({time, pitch}: Beat) => {
  var osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.frequency.value = pitch
  osc.start(time)
  osc.stop(time + noteLength)
}

const makeScheduler = (state: SchedulerState) => {
  let nextNoteTime = 0.0
  const {audioContext, bpm, subDivisions} = state
  const noteScheduler = scheduleNote(audioContext)
  const secondsPerBeat = 60.0 / bpm
  const scheduleSubDivisions = ({divisions, on, pitch}: SubDivision) => {
    if (on) {
      const noteOffset = secondsPerBeat / divisions
      R.range(1, divisions).map((division) =>
        noteScheduler({time: nextNoteTime + division * noteOffset, pitch})
      )
    }
  }
  return () => {
    while (
      nextNoteTime <
      audioContext.currentTime + state.scheduleAheadTimeSeconds
    ) {
      // Quarter Note
      noteScheduler({time: nextNoteTime, pitch: 440})
      // Eigth Note
      R.mapObjIndexed(scheduleSubDivisions, subDivisions)
      nextNoteTime += secondsPerBeat
    }
  }
}

const subDivisionsL = (division: string) =>
  R.lensPath(['schedulerState', 'subDivisions', division, 'on'])
const bpmL = R.lensPath(['schedulerState', 'bpm'])
const playingL = R.lensPath(['playing'])
const timerIdL = R.lensPath(['timerId'])
const tapTimesL = R.lensPath(['tapTimes'])
const topL = R.lensPath([])

const makeInitialState = (): State => ({
  playing: false,
  timerId: undefined,
  tapTimes: [],
  schedulerState: {
    bpm: 60,
    audioContext: new AudioContext(),
    scheduleAheadTimeSeconds: 0.1,
    subDivisions: {
      _2: {on: false, pitch: 880, divisions: 2, label: '8th'},
      _3: {on: false, pitch: 880, divisions: 3, label: 'triplet'},
      _4: {on: false, pitch: 880, divisions: 4, label: '16th'},
      _5: {on: false, pitch: 880, divisions: 5, label: 'fiveple'},
      _6: {on: false, pitch: 880, divisions: 6, label: 'sixlet'},
      _7: {on: false, pitch: 880, divisions: 7, label: 'sevenple'},
      _8: {on: false, pitch: 880, divisions: 8, label: '32nd'},
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

const Metronome = () => {
  const [
    {
      timerId,
      playing,
      schedulerState,
      schedulerState: {
        bpm,
        subDivisions,
      },
    },
    setState,
  ] = useState(makeInitialState)

  useEffect(() => {
    clearInterval(timerId)
    if (playing) {
      const scheduler = makeScheduler(schedulerState)
      scheduler()
      const newTimer = setInterval(() => {
        scheduler()
      }, schedulerState.scheduleAheadTimeSeconds * 1000)
      setState(set(timerIdL, newTimer))
    }
  }, [playing, schedulerState])

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

  const toggleStart = () => setState(over(playingL, R.not))

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

  return (
    <>
      <div>bpm: {bpm}</div>
      <div>playing: {playing + ''}</div>
      <div>
        <button onClick={onTap}>Tap</button>
      </div>
      <div>
        {Object.keys(subDivisions).map((key) => {
          const division = key as keyof SubDivisions;
          const {label, on} = subDivisions[division];
          return (
            <div key={division}>
              <label>{label}</label>
              <input type="checkbox" checked={on} onChange={toggleSubDivision(division)} />
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
