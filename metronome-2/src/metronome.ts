import {useEffect, useRef} from 'react'
import useRaf from '@rooks/use-raf'
import {Beat, SchedulerState, SubDivision} from './types'
import * as R from 'ramda'

const baseNoteLength = 0.05
// a third of the base length comes from
// https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime
const gainLength = baseNoteLength / 3
const scheduleNote = (audioContext: AudioContext, {time, pitch}: Beat) => {
  // For additional details on why the gain node is needed, see this:
  // http://alemangui.github.io/blog//2015/12/26/ramp-to-value.html
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()

  osc.connect(gain)
  gain.connect(audioContext.destination)

  // This is necessary or there's lots of clicking when the signal ends abruptly.
  // I haven't tested this auditorally yet. I might want to do
  // time + baseNoteLength - gainLength
  const gainStartTime = time + baseNoteLength
  gain.gain.setTargetAtTime(0, gainStartTime, gainLength)

  osc.frequency.value = pitch
  osc.start(time)
  osc.stop(time + baseNoteLength)
}

const beatsForSubDivision = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  {divisions, on, pitch}: SubDivision
) => {
  if (on) {
    const noteOffset = secondsPerBeat / divisions
    return R.range(1, divisions).map((division) => {
      const time = startOfBeatTime + division * noteOffset
      return {time, pitch}
    })
  }
  return []
}

const makeScheduler = (
  state: SchedulerState,
  nextBeat: (time: number) => void,
  scheduleAhead: number
) => {
  // base the starting noteTime on the current audioContext time. This way we can only use one audioContext.
  const {bpm, subDivisions, audioContext} = state
  let nextNoteTime = audioContext.currentTime
  const secondsPerBeat = 60.0 / bpm
  const schedule = (beat: Beat) => {
    scheduleNote(audioContext, beat)
  }
  return () => {
    while (nextNoteTime < audioContext.currentTime + scheduleAhead) {
      // Quarter Note
      scheduleNote(audioContext, {time: nextNoteTime, pitch: 440})
      // Adds the scheduled note so the gui can refresh at the right time.
      nextBeat(nextNoteTime)

      // TODO - subDivisions could just be an array for the values that are set.
      // That would be simplier than needing to do all this fancy keys.map
      // stuff.
      // Go through the subDivisions and schedule them.
      for (const subDivision of Object.values(subDivisions) as Array<
        SubDivision
      >) {
        const beats = beatsForSubDivision(
          nextNoteTime,
          secondsPerBeat,
          subDivision
        )
        beats.forEach(schedule)
      }
      nextNoteTime += secondsPerBeat
    }
  }
}

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  nextBeats: number[],
  nextBeat: (time: number) => void,
  // TODO - make sure this gets called when we stop. Otherwise there's a weird sync-up behavior.
  updateCurrentBeat: Function
) => {
  const scheduleAhead = 0.2
  // TODO - research if it really matters if useRef is passed nothing or an
  // initial value. It makes type-checking easier, but I'm not sure if one or
  // the other is considered idomatic.
  const scheduler = useRef<() => void>()
  // TODO - I have to do this in order to make the lint check work for
  // setEffect, but this doesn't seem to actually change any behavior. Check if
  // theres a better way to do this.
  // I think this doc has the answer, but can't check because I'm on a plane.
  // https://reactjs.org/docs/hooks-faq.html#is-it-safe-to-omit-functions-from-the-list-of-dependencies
  const nextBeatRef = useRef(nextBeat)

  useEffect(() => {
    nextBeatRef.current = nextBeat
  }, [nextBeat])

  useEffect(() => {
    console.log('scheduler effect')
    if (playing) {
      console.log('updating scheduler.current')
      scheduler.current = makeScheduler(
        schedulerState,
        nextBeatRef.current,
        scheduleAhead
      )
    }
  }, [schedulerState, playing])

  // We want the setInterval to overlap with the scheduler.
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined
  useEffect(() => {
    console.log('setInterval effect')
    if (delay !== undefined) {
      console.log('subscribed to setInterval')
      const tick = () => {
        // TODO - this force shouldn't be necessary.
        scheduler.current!()
      }
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
        console.log('clearing interval')
      }
    }
  }, [delay])

  const {audioContext} = schedulerState
  const draw = () => {
    const now = audioContext.currentTime
    const pastBeats = nextBeats.filter((time) => time < now && time !== 0)
    if (pastBeats.length > 0) {
      updateCurrentBeat(now, pastBeats)
    }
  }
  // TODO - replace this with custom version since I need to do different checks for re-renders.
  // TODO - this seems to not work because of something with audioContext always being the old one.
  // TODO - I don't want to expensively draw if the tab is in the background
  useRaf(draw, playing)
}
