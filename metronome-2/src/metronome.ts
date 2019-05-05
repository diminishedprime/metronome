import {useEffect, useRef} from 'react'
import useRaf from '@rooks/use-raf'
import {useInterval} from './custom-hooks'
import {Beat, SchedulerState, SubDivision} from './types'
import * as R from 'ramda'

const baseNoteLength = 0.05

const scheduleNote = (audioContext: AudioContext) => ({time, pitch}: Beat) => {
  var osc = audioContext.createOscillator()
  osc.connect(audioContext.destination)
  osc.frequency.value = pitch
  osc.start(time)
  osc.stop(time + baseNoteLength)
}

const makeScheduler = (
  state: SchedulerState,
  nextBeat: (time: number) => void,
  audioContext: AudioContext
) => {
  let nextNoteTime = 0.0
  const {bpm, subDivisions} = state
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
      nextBeat(nextNoteTime)
      // Eigth Note
      R.mapObjIndexed(scheduleSubDivisions, subDivisions)
      nextNoteTime += secondsPerBeat
    }
  }
}

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  nextBeats: number[],
  nextBeat: (time: number) => void,
  updateCurrentBeat: Function
) => {
  const audioContext = useRef<AudioContext>(new AudioContext())
  const scheduler = useRef(
    makeScheduler(schedulerState, nextBeat, audioContext.current)
  )
  useEffect(() => {
    console.log('audioContext effect')
    if (playing) {
      audioContext.current = new AudioContext()
    }
  }, [playing])

  useEffect(() => {
    if (playing) {
      console.log('make new scheduler')
      scheduler.current = makeScheduler(
        schedulerState,
        nextBeat,
        audioContext.current
      )
    }
  }, [schedulerState, playing])

  // schedule ahead 100 ms at a time.
  const delay = playing ? 100 : undefined
  useInterval(scheduler.current, delay)

  const draw = () => {
    const now = audioContext.current.currentTime
    const pastBeats = nextBeats.filter((time) => time < now && time !== 0)
    if (pastBeats.length > 0) {
      console.log('I am drawing something new')
      updateCurrentBeat(now, pastBeats)
    }
  }
  // TODO - replace this with custom version since I need to do different checks for re-renders.
  // TODO - this seems to not work because of something with audioContext always being the old one.
  // TODO - I don't want to expensively draw if the tab is in the background
  useRaf(draw, playing)
}
