import {useEffect, useRef, useLayoutEffect} from 'react'
import {Beat, SchedulerState, SubDivision} from './types'
import * as R from 'ramda'

const baseNoteLength = 0.05
// a third of the base length comes from
// https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime
const gainLength = baseNoteLength / 3
const scheduleNote = (
  audioContext: AudioContext,
  {time, pitch, gain}: Beat
) => {
  // For additional details on why the gain node is needed, see this:
  // http://alemangui.github.io/blog//2015/12/26/ramp-to-value.html
  const osc = audioContext.createOscillator()
  const deClip = audioContext.createGain()
  const volume = audioContext.createGain()

  osc.connect(deClip)
  deClip.connect(volume)
  volume.connect(audioContext.destination)

  // This is necessary or there's lots of clicking when the signal ends abruptly.
  // I haven't tested this auditorally yet. I might want to do
  // time + baseNoteLength - gainLength
  const gainStartTime = time + baseNoteLength
  deClip.gain.setTargetAtTime(0, gainStartTime, gainLength)

  volume.gain.value = gain

  osc.frequency.value = pitch
  osc.start(time)
  osc.stop(time + baseNoteLength)
}

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  {divisions, on, pitch, gain}: SubDivision
): Array<Beat> => {
  if (on) {
    const noteOffset = secondsPerBeat / divisions
    return R.range(1, divisions).map((division) => {
      const time = startOfBeatTime + division * noteOffset
      return {time, pitch, gain}
    })
  }
  return []
}

const makeScheduler = (
  state: SchedulerState,
  nextBeat: (time: number) => void,
  scheduleAhead: number
) => {
  const {bpm, subDivisions, audioContext} = state
  let nextNoteTime = audioContext.currentTime
  const secondsPerBeat = 60.0 / bpm
  const schedule = (beat: Beat) => {
    scheduleNote(audioContext, beat)
  }
  return () => {
    while (nextNoteTime < audioContext.currentTime + scheduleAhead) {
      // Quarter Note
      nextBeat(nextNoteTime)
      scheduleNote(audioContext, {time: nextNoteTime, pitch: 440, gain: 1.0})
      // Adds the scheduled note so the gui can refresh at the right time.
      // Subdivisions
      for (const subDivision of subDivisions) {
        const beats = beatsFor(nextNoteTime, secondsPerBeat, subDivision)
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
    if (playing) {
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
    if (delay !== undefined) {
      const tick = () => {
        // TODO - this force shouldn't be necessary.
        scheduler.current!()
      }
      const id = setInterval(tick, delay)
      return () => {
        clearInterval(id)
      }
    }
  }, [delay])

  const {audioContext} = schedulerState
  // TODO - don't update if the tab is in the background
  useLayoutEffect(() => {
    let animationFrame: number

    function tick() {
      loop()
      const now = audioContext.currentTime
      const pastBeats = nextBeats.filter((time) => time <= now && time !== 0)
      if (pastBeats.length > 0) {
        updateCurrentBeat(now, pastBeats)
      }
    }

    function loop() {
      animationFrame = requestAnimationFrame(tick)
    }

    if (playing) {
      loop()
      return () => {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [playing, audioContext, nextBeats, updateCurrentBeat])
}
