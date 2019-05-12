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
  sound.detune.value = -pitch;

  const volume = audioContext.createGain();
  volume.gain.value = gain;

  sound.connect(volume);
  volume.connect(audioContext.destination);

  sound.start(time);
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

const scheduleGroup = (
  nextNoteTime: MutableRefObject<number>,
  schedulerState: MutableRefObject<SchedulerState>,
  buffer: AudioBuffer | undefined,
  setNextBeatTime: (time: number) => void
) => {
  const {
    bpm,
    subDivisions,
    audioContext,
    scheduleAhead
  } = schedulerState.current;
  const secondsPerBeat = 60.0 / bpm;
  const schedule = (beat: Beat) => {
    scheduleNote(audioContext, beat);
  };
  while (nextNoteTime.current < audioContext.currentTime + scheduleAhead) {
    // Quarter Note
    scheduleNote(audioContext, {
      time: nextNoteTime.current,
      pitch: 0,
      gain: 1.0,
      buffer: buffer!
    });
    setNextBeatTime(nextNoteTime.current);
    // Adds the scheduled note so the gui can refresh at the right time.
    // Subdivisions
    for (const subDivision of subDivisions) {
      const beats = beatsFor(
        nextNoteTime.current,
        secondsPerBeat,
        subDivision,
        buffer!
      );
      beats.forEach(schedule);
    }
    nextNoteTime.current += secondsPerBeat;
  }
};

const useAudioBuffer = (url: string): AudioBuffer | undefined => {
  const [buffer, updateBuffer] = useState<AudioBuffer>();
  useEffect(() => {
    const audioContext = new AudioContext();
    fetch(url)
      .then(response => response.arrayBuffer())
      .then(buffer => audioContext.decodeAudioData(buffer))
      .then(updateBuffer);
  }, [url]);
  return buffer;
};

const useMutableLayout = <T>(dep: T): MutableRefObject<T> => {
  const mutableRef = useRef<T>(dep);
  useLayoutEffect(() => {
    mutableRef.current = dep;
  }, [dep]);
  return mutableRef;
};

const useMutable = <T>(dep: T): MutableRefObject<T> => {
  const mutableRef = useRef<T>(dep);
  useEffect(() => {
    mutableRef.current = dep;
  }, [dep]);
  return mutableRef;
};

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  incCurrentBeat: Function
) => {
  // TODO - don't update if the tab is in the background
  const { audioContext, scheduleAhead } = schedulerState;
  const [nextBeatTime, setNextBeatTime] = useState<number>();
  const nextBeatTimeRef = useMutableLayout(nextBeatTime);
  const nextNoteTimeRef = useRef<number>(0);
  const buffer = useAudioBuffer(click);
  const schedulerStateRef = useMutable(schedulerState);

  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;
  useEffect(() => {
    if (delay !== undefined) {
      nextNoteTimeRef.current =
        schedulerStateRef.current.audioContext.currentTime + 0.1;
      const tick = () => {
        scheduleGroup(
          nextNoteTimeRef,
          schedulerStateRef,
          buffer,
          setNextBeatTime
        );
      };
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, buffer]);

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
