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

// TODO - Update currentBeat to instead be something like
// currentSubdivisionsforBeat.

// One really neat thing I'd like to do with this is allow different
// subDivisions per beat. i.e. a beat subdivided into 3, then the next beat
// subdivided into 5

// this isn't the point, but this also allows us to do something like 7/8 fairly
// easily.

// Right now I can't play 3 then 5 because I only have sub-divisions at the
// measure level, but all I'll need to do is update the scheduler state to
// include this and use that instead of the current subDivisions at the
// scheduler level.

// I should be able to store the same subDivisions data, but for each beat.

// Instead of just keeping track of currentBeat of the numerator of the
// timesignature, we want to keep track of the current subDivions of each
// individual beat along with which one of them is active.

// Data for each beat would look something like

// interface CurrentBeatData {
//   // there will always be an entry of 1: [true|false], but the other divisions
//   // will either be set or not.
//   isCurrent: boolean;
//   [subDivision: number]: boolean[];
// }

// So a 2/4 measure might look something like this
// [
//   {
//     isCurrent: true,
//     2: [false, true],
//     3: [false, false, true]
//   },
//   {
//     isCurrent: false,
//     2: [false, true],
//     3: [false, false, true]
//   }
// ]

// Incrementing this will be a bit tricker since we'll need to keep track of the
// scheduled subdivision times as well so we know when to update current beat
// data.

// We should be able to do something close to what we were doing before, that is:



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
