import React from 'react'
import {useState, useEffect} from 'react'
import styled from 'styled-components'
import {over, set} from 'ramda'
import * as R from 'ramda'

interface SchedulerState {
  bpm: number
  audioContext: AudioContext
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

const makeScheduler = (
  state: SchedulerState,
  scheduleAheadTime: number = 0.1
) => {
  let nextNoteTime = 0.0
  let current16thNote = 0
  const {audioContext, bpm} = state
  const noteScheduler = scheduleNote(audioContext)
  const secondsPerBeat = 60.0 / bpm
  const secondsPer16th = 0.25 * secondsPerBeat
  return () => {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      noteScheduler({time: nextNoteTime, pitch: 440})
      nextNoteTime += secondsPer16th
      current16thNote++
      if (current16thNote === 16) {
        current16thNote = 0
      }
    }
  }
}

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
    bpm: 120,
    audioContext: new AudioContext(),
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
      tapTimes,
      schedulerState: {bpm},
    },
    setState,
  ] = useState(makeInitialState)

  useEffect(() => {
    clearInterval(timerId)
    if (playing) {
      const scheduler = makeScheduler(schedulerState)
      const newTimer = setInterval(() => {
        scheduler()
      }, 100)
      setState(set(timerIdL, newTimer))
    }
  }, [playing, schedulerState])

  const changeBPM = (diff: number) => () =>
    setState(
      R.pipe(
        over(bpmL, R.add(diff)),
        set(tapTimesL, [])
      )
    )

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
        <button onClick={changeBPM(-10)}>-10</button>
        <button onClick={changeBPM(10)}>+10</button>
      </div>
      <div>
        <button onClick={toggleStart}>{playing ? 'Stop' : 'Start'}</button>
      </div>
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
