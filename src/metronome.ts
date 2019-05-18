import {
  useEffect,
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction
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
      return { time, pitch, gain: gain * 0.5, buffer };
    });
  }
  return [];
};

const scheduleGroup = (
  nextNoteTime: MutableRefObject<number>,
  schedulerState: MutableRefObject<SchedulerState>,
  buffer: AudioBuffer | undefined,
  setNextBeatTime: (time: number) => void,
  audioContext: AudioContext
) => {
  const { bpm, subDivisions, scheduleAhead } = schedulerState.current;
  const secondsPerBeat = 60.0 / bpm;
  const schedule = (beat: Beat) => {
    scheduleNote(audioContext, beat);
  };
  while (nextNoteTime.current < audioContext.currentTime + scheduleAhead) {
    // Quarter Note
    scheduleNote(audioContext, {
      time: nextNoteTime.current,
      pitch: 0,
      gain: 0.5,
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

const useScheduleAhead = (
  playing: boolean,
  schedulerState: SchedulerState,
  setNextBeatTime: (time: number) => void,
  audioContext: AudioContext
) => {
  const { scheduleAhead } = schedulerState;
  const buffer = useAudioBuffer(click);
  const nextNoteTimeRef = useRef<number>(0);
  const schedulerStateRef = useMutable(schedulerState);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;

  useEffect(() => {
    if (delay !== undefined) {
      const initialTime = audioContext.currentTime + 0.1;
      nextNoteTimeRef.current = initialTime;
      const tick = () => {
        scheduleGroup(
          nextNoteTimeRef,
          schedulerStateRef,
          buffer,
          setNextBeatTime,
          audioContext
        );
      };
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, buffer, schedulerStateRef, setNextBeatTime, audioContext]);
};

const useDisplayUpdater = (
  playing: boolean,
  audioContext: AudioContext,
  nextBeatTime: number | undefined,
  setNextBeatTime: (time: number | undefined) => void,
  incCurrentBeat: () => void
) => {
  const nextBeatTimeRef = useMutableLayout(nextBeatTime);

  useLayoutEffect(() => {
    let animationFrame: number;
    // We special case the first beat since we don't want to start with the UI on beat one.
    let firstBeat = true;

    const tick = () => {
      loop();
      const now = audioContext.currentTime;
      const nextBeat = nextBeatTimeRef.current;
      if ((nextBeat !== undefined && now <= nextBeat) || firstBeat) {
        setNextBeatTime(undefined);
        incCurrentBeat();
        firstBeat = false;
      }
    };

    const loop = () => {
      animationFrame = requestAnimationFrame(tick);
    };

    if (playing) {
      loop();
      return () => {
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [playing, audioContext, incCurrentBeat, nextBeatTimeRef, setNextBeatTime]);
};

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  audioContext: AudioContext
): [number, Dispatch<SetStateAction<number>>] => {
  // TODO - don't update if the tab is in the background
  const [nextBeatTime, setNextBeatTime] = useState<number>();
  const [currentBeat, setCurrentBeat] = useState(0);
  const {
    signature: { numerator }
  } = schedulerState;

  const incCurrentBeat = useCallback(
    () =>
      setCurrentBeat(oldBeat => {
        let newBeat = oldBeat + 1;
        if (oldBeat >= numerator) {
          newBeat = 1;
        }
        return newBeat;
      }),
    [numerator]
  );

  useScheduleAhead(playing, schedulerState, setNextBeatTime, audioContext);
  useDisplayUpdater(
    playing,
    audioContext,
    nextBeatTime,
    setNextBeatTime,
    incCurrentBeat
  );

  return [currentBeat, setCurrentBeat];
};
