import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  MutableRefObject
} from "react";
import { Beat, SchedulerState, SubDivision } from "./types";
import * as R from "ramda";

const baseNoteLength = 0.05;
// a third of the base length comes from
// https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/setTargetAtTime
const scheduleNote = (
  audioContext: AudioContext,
  { time, pitch, gain }: Beat
) => {
  // For additional details on why the gain node is needed, see this:
  // http://alemangui.github.io/blog//2015/12/26/ramp-to-value.html
  const osc = audioContext.createOscillator();
  const deClip = audioContext.createGain();
  const volume = audioContext.createGain();

  osc.connect(deClip);
  deClip.connect(volume);
  volume.connect(audioContext.destination);

  const noteLength = Math.floor(pitch * baseNoteLength) * (1 / pitch);
  deClip.gain.exponentialRampToValueAtTime(0.1, time + noteLength * 2);
  osc.type = "triangle";

  volume.gain.value = gain;

  osc.frequency.value = pitch;
  osc.start(time);
  osc.stop(time + noteLength);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  { divisions, on, pitch, gain }: SubDivision
): Array<Beat> => {
  if (on) {
    const noteOffset = secondsPerBeat / divisions;
    return R.range(1, divisions).map(division => {
      const time = startOfBeatTime + division * noteOffset;
      return { time, pitch, gain };
    });
  }
  return [];
};

// TODO - this could probably be a 'useScheduler' effect.
const makeScheduler = (
  state: MutableRefObject<SchedulerState>,
  scheduleAhead: number,
  setNextBeatTime: (time: number) => void
) => {
  let nextNoteTime = state.current.audioContext.currentTime;
  return () => {
    const { bpm, subDivisions, audioContext } = state.current;
    const secondsPerBeat = 60.0 / bpm;
    const schedule = (beat: Beat) => {
      scheduleNote(audioContext, beat);
    };
    while (nextNoteTime < audioContext.currentTime + scheduleAhead) {
      // Quarter Note
      scheduleNote(audioContext, { time: nextNoteTime, pitch: 440, gain: 1.0 });
      setNextBeatTime(nextNoteTime);
      // Adds the scheduled note so the gui can refresh at the right time.
      // Subdivisions
      for (const subDivision of subDivisions) {
        const beats = beatsFor(nextNoteTime, secondsPerBeat, subDivision);
        beats.forEach(schedule);
      }
      nextNoteTime += secondsPerBeat;
    }
  };
};

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  incCurrentBeat: Function
) => {
  // TODO - scheduleAhead should be at least 1 second if tab is blurred.
  const scheduleAhead = 0.2;

  const schedulerStateRef = useRef(schedulerState);
  useEffect(() => {
    schedulerStateRef.current = schedulerState;
  }, [schedulerState]);

  const [nextBeatTime, setNextBeatTime] = useState<number>();

  const schedulerRef = useRef<() => void>();
  useEffect(() => {
    console.log("make scheduler effect");
    schedulerRef.current = makeScheduler(
      schedulerStateRef,
      scheduleAhead,
      setNextBeatTime
    );
  }, [setNextBeatTime]);

  // We want the setInterval to overlap with the scheduler.
  // TODO - we want to change the
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;
  useEffect(() => {
    if (delay !== undefined) {
      const id = setInterval(schedulerRef.current, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);

  const { audioContext } = schedulerState;
  // TODO - don't update if the tab is in the background
  const nextBeatTimeRef = useRef<number>();

  useLayoutEffect(() => {
    nextBeatTimeRef.current = nextBeatTime;
  }, [nextBeatTime]);

  useLayoutEffect(() => {
    let animationFrame: number;

    function tick() {
      loop();
      const now = audioContext.currentTime;
      if (
        nextBeatTimeRef.current !== undefined &&
        now <= nextBeatTimeRef.current
      ) {
        setNextBeatTime(undefined);
        incCurrentBeat();
      }
    }

    function loop() {
      animationFrame = requestAnimationFrame(tick);
    }

    if (playing) {
      loop();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [playing, audioContext, incCurrentBeat]);
};
