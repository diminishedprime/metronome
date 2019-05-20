import {
  useEffect,
  useRef,
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
  nextNoteTimeRef: MutableRefObject<number>,
  schedulerState: MutableRefObject<SchedulerState>,
  buffer: AudioBuffer | undefined,
  setNextBeatTime: (time: number | "waiting") => void,
  audioContext: AudioContext
) => {
  const {
    bpm,
    signature: { subDivisions },
    scheduleAhead
  } = schedulerState.current;
  const secondsPerBeat = 60.0 / bpm;
  const schedule = (beat: Beat) => {
    scheduleNote(audioContext, beat);
  };
  if (nextNoteTimeRef.current < audioContext.currentTime + scheduleAhead) {
  }
  while (nextNoteTimeRef.current < audioContext.currentTime + scheduleAhead) {
    const nextNoteTime = nextNoteTimeRef.current;
    nextNoteTimeRef.current += secondsPerBeat;
    // Adds the scheduled note so the gui can refresh at the right time.
    setNextBeatTime(nextNoteTime);
    // Quarter Note
    scheduleNote(audioContext, {
      time: nextNoteTime,
      pitch: 0,
      gain: 0.5,
      buffer: buffer!
    });
    // Subdivisions
    for (const subDivision of subDivisions) {
      const beats = beatsFor(
        nextNoteTime,
        secondsPerBeat,
        subDivision,
        buffer!
      );
      beats.forEach(schedule);
    }
  }
};

const useAudioBuffer = (
  audioContext: AudioContext | undefined,
  url: string
): AudioBuffer | undefined => {
  const [buffer, updateBuffer] = useState<AudioBuffer>();
  useEffect(() => {
    if (audioContext !== undefined) {
      fetch(url)
        .then(response => response.arrayBuffer())
        .then(buffer => audioContext.decodeAudioData(buffer))
        .then(updateBuffer);
    }
  }, [url, audioContext]);
  return buffer;
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
  setNextBeatTime: (time: number | "waiting") => void,
  audioContext: AudioContext | undefined
) => {
  const { scheduleAhead } = schedulerState;
  const buffer = useAudioBuffer(audioContext, click);
  const schedulerStateRef = useMutable(schedulerState);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;
  const nextNoteTimeRef = useRef(-100);

  useEffect(() => {
    if (delay !== undefined && audioContext !== undefined) {
      // TODO - there's something fishy going on here.
      nextNoteTimeRef.current = audioContext.currentTime + 0.3;
      const tick = () => {
        scheduleGroup(
          nextNoteTimeRef,
          schedulerStateRef,
          buffer,
          setNextBeatTime,
          audioContext
        );
      };
      tick();
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, buffer, schedulerStateRef, setNextBeatTime, audioContext]);
};

const useDisplayUpdater = (
  playing: boolean,
  audioContext: AudioContext | undefined,
  nextBeatTime: number | "waiting",
  setNextBeatTime: (time: number | "waiting") => void,
  incCurrentBeat: () => void
) => {
  useEffect(() => {
    if (audioContext !== undefined && playing) {
      let animationFrame: number;
      const tick = () => {
        loop();
        const now = audioContext.currentTime;
        if (nextBeatTime !== "waiting" && now <= nextBeatTime) {
          setNextBeatTime("waiting");
          incCurrentBeat();
        }
      };
      const loop = () => {
        animationFrame = requestAnimationFrame(tick);
      };

      loop();
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [nextBeatTime, audioContext, incCurrentBeat, playing, setNextBeatTime]);
};

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  audioContext: AudioContext | undefined
): [number | undefined, Dispatch<SetStateAction<number | undefined>>] => {
  // TODO - don't update if the tab is in the background
  const [nextBeatTime, setNextBeatTime] = useState<number | "waiting">(
    "waiting"
  );
  const [currentBeat, setCurrentBeat] = useState<number | undefined>();
  const {
    signature: { numerator }
  } = schedulerState;

  useEffect(() => {
    if (!playing) {
      setNextBeatTime("waiting");
    }
  }, [playing]);

  const incCurrentBeat = useCallback(
    () =>
      setCurrentBeat(oldBeat => {
        if (oldBeat === undefined) {
          return 0;
        }
        let newBeat = oldBeat + 1;
        if (oldBeat >= numerator - 1) {
          newBeat = 0;
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
