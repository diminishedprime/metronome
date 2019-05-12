import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  MutableRefObject
} from "react";
import { Beat, SchedulerState, SubDivision } from "./types";
import * as R from "ramda";
const click = require("./click.wav");

const scheduleNote = (
  audioContext: AudioContext,
  { time, gain, buffer, pitch }: Beat
) => {
  const sound = audioContext.createBufferSource();
  sound.buffer = buffer;
  sound.detune.value = pitch;

  const volume = audioContext.createGain();
  volume.gain.value = gain;

  sound.connect(volume);
  volume.connect(audioContext.destination);

  sound.start(time);
  console.log({ time });
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  { divisions, on, pitch, gain }: SubDivision,
  buffer: AudioBuffer
): Array<Beat> => {
  if (on) {
    const noteOffset = secondsPerBeat / divisions;

    return R.range(1, divisions).map(division => {
      const time = startOfBeatTime + division * noteOffset;
      return { time, pitch, gain, buffer };
    });
  }
  return [];
};

// TODO - this could probably be a 'useScheduler' effect.
const makeScheduler = (
  state: MutableRefObject<SchedulerState>,
  scheduleAhead: number,
  setNextBeatTime: (time: number) => void,
  buffer: MutableRefObject<AudioBuffer | undefined>
) => {
  let nextNoteTime = state.current.audioContext.currentTime;
  console.log({ nextNoteTime });
  return () => {
    const { bpm, subDivisions, audioContext } = state.current;
    const secondsPerBeat = 60.0 / bpm;
    const schedule = (beat: Beat) => {
      scheduleNote(audioContext, beat);
    };
    while (nextNoteTime < audioContext.currentTime + scheduleAhead) {
      // Quarter Note
      scheduleNote(audioContext, {
        time: nextNoteTime,
        pitch: 0,
        gain: 1.0,
        buffer: buffer.current!
      });
      setNextBeatTime(nextNoteTime);
      // Adds the scheduled note so the gui can refresh at the right time.
      // Subdivisions
      for (const subDivision of subDivisions) {
        const beats = beatsFor(
          nextNoteTime,
          secondsPerBeat,
          subDivision,
          buffer.current!
        );
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

  const bufferRef = useRef<AudioBuffer | undefined>();
  useEffect(() => {
    console.log("buffer effect");
    var request = new XMLHttpRequest();
    request.open("GET", click, true);
    request.responseType = "arraybuffer";
    request.onload = function() {
      var audioData = request.response;
      audioContext.decodeAudioData(audioData, function(buffer) {
        bufferRef.current = buffer;
        console.log("setting buffer");
      });
    };
    request.send();
  }, []);

  const schedulerRef = useRef<() => void>();
  useEffect(() => {
    schedulerRef.current = makeScheduler(
      schedulerStateRef,
      scheduleAhead,
      setNextBeatTime,
      bufferRef
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
