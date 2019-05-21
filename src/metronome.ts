import {
  useEffect,
  useRef,
  useState,
  useCallback,
  MutableRefObject,
  Dispatch,
  SetStateAction
} from "react";
import { SchedulerState } from "./types";
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

  const now = audioContext.currentTime;
  const difference = now - time;
  // console.log("Scheduling a note for: ", { difference });
  sound.start(time);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  divisions: SignatureBeat["subDivisions"],
  buffer: AudioBuffer
): Array<Beat> => {
  return divisions.reduce((acc: Beat[], { divisions, pitch, gain }) => {
    const noteOffset = secondsPerBeat / divisions;
    const newBeats = R.range(0, divisions).map((idx: number) => {
      const time = startOfBeatTime + idx * noteOffset;
      const beat: Beat = {
        time,
        pitch,
        gain: gain * 0.5,
        buffer,
        divisions,
        idx
      };
      return beat;
    });
    return acc.concat(newBeats);
  }, []);
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

const runAtTime = (
  audioContext: AudioContext,
  timeToRun: number,
  rafWindowTime: number,
  callback: () => void
) => {
  const now = audioContext.currentTime;
  if (timeToRun <= now) {
    callback();
  } else if (timeToRun <= now + rafWindowTime) {
    // retry every frame until the very first frame in the correct timestamp
    window.requestAnimationFrame(() =>
      runAtTime(audioContext, timeToRun, rafWindowTime, callback)
    );
  } else {
    const sleepTime = ((timeToRun - rafWindowTime - now) / 2) * 1000;
    setTimeout(
      () => runAtTime(audioContext, timeToRun, rafWindowTime, callback),
      sleepTime
    );
  }
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

// interface SignatureBeatData {
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

export interface Beat {
  time: number;
  pitch: number;
  gain: number;
  buffer: AudioBuffer;
  divisions: Divisions;
  idx: number;
}

export interface Signature {
  numerator: number;
  denominator: number;
  current: number;
  beats: Array<SignatureBeat>;
}

export interface Division {
  gain: number;
  pitch: number;
  divisions: Divisions;
  current: number | undefined;
}

export interface SignatureBeat {
  subDivisions: Array<Division>;
}

// TODO(mjhamrick) - If i find those types for time, beatTime, and the number[] should both be time.
export type Divisions = 1 | 2 | 3 | 4 | 5 | 6;
// Numbers aren't right, but this is the idea.
// [[1, [3.0]], [2, [3.0, 3.45]], [3, [3.0, 3.3, 3.9]]]
type NextBeatDivisions = Array<Divisions>;

interface State {
  bpm: number;
  playing: boolean;
  currentBeat?: SignatureBeat;
  nextBeatDivisions?: NextBeatDivisions;
  signature: Signature;
  activeSubDivisions: Division[][];
}

// TODO - this is definitely the way to go. This way, all of the state needed to
// play the metronome is managed locally, but there are a few functions that can
// be used to make it change its behavior.
interface Metronome {
  start: (bpm?: number) => void;
  stop: () => void;
  state: State;
}

export const useMetronome2 = (
  audioContext: AudioContext | undefined
): Metronome => {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBPM] = useState(90);
  const [signature, setSignature] = useState<Signature>({
    numerator: 3,
    denominator: 4,
    current: 0,
    beats: [
      {
        subDivisions: [
          { gain: 1.0, pitch: 220, divisions: 2, current: undefined }
        ]
      },
      {
        subDivisions: [
          { gain: 1.0, pitch: 330, divisions: 3, current: undefined }
        ]
      },
      {
        subDivisions: [
          { gain: 1.0, pitch: 430, divisions: 4, current: undefined }
        ]
      }
    ]
  });
  const [activeSubDivisions, setActiveSubDivisions] = useState<Division[][]>([
    [{ gain: 1.0, pitch: 220, divisions: 2, current: undefined }],
    [{ gain: 1.0, pitch: 330, divisions: 3, current: undefined }],
    [{ gain: 1.0, pitch: 440, divisions: 4, current: undefined }]
  ]);
  const [nextBeatTime, setNextBeatTime] = useState();
  const buffer = useAudioBuffer(audioContext, click);

  const { beats, current: currentBeatIdx } = signature;

  useEffect(() => {
    if (playing && audioContext !== undefined) {
      // Initialize the first beat time to 300 ms in the future.
      setNextBeatTime(audioContext.currentTime + 0.3);
    }
  }, [audioContext, playing]);

  const start = useCallback(
    (bpm?: number) => {
      if (bpm !== undefined) {
        setBPM(bpm);
      }
      setPlaying(true);
    },
    [setPlaying]
  );

  const nextBeat = () => {
    setSignature(oldSignature => {
      // TODO replace numerator since it's just beats.length
      const nextBeat = (oldSignature.current + 1) % oldSignature.numerator;
      return Object.assign(oldSignature, { current: nextBeat });
    });
  };

  const setCurrentSubDivision = (
    currentBeatIdx: number,
    divisions: Divisions,
    idx: number
  ) => {
    console.log({ currentBeatIdx, divisions, idx });
    // reset the not current beat ones.
    setActiveSubDivisions(oldActiveSubs => {
      const otherLenses = R.range(0, oldActiveSubs.length)
        .filter(beatIdx => beatIdx !== currentBeatIdx)
        .map(i => R.lensIndex(i));
      return otherLenses.reduce((acc, lens) => {
        return R.over(
          lens,
          (divisions: Division[]) => {
            return divisions.map(division => ({
              ...division,
              current: undefined
            }));
          },
          acc
        );
      }, oldActiveSubs);
    });

    // update with new value
    setActiveSubDivisions(oldActiveSubs => {
      return R.over(
        R.lensIndex(currentBeatIdx),
        (oldBeatDivisions: Division[]) => {
          const oldBeatIdx = oldBeatDivisions.findIndex(
            (division: Division) => {
              return division.divisions === divisions;
            }
          );
          return R.over(
            R.lensIndex(oldBeatIdx),
            (oldDivision: Division) => {
              return R.set(R.lensProp("current"), idx, oldDivision);
            },
            oldBeatDivisions
          );
        },
        oldActiveSubs
      );
    });
  };

  const stop = useCallback(() => {
    setPlaying(false);
    setNextBeatTime(undefined);
  }, [setPlaying]);
  // The actual metronome bits.
  useEffect(() => {
    if (
      audioContext !== undefined &&
      nextBeatTime !== undefined &&
      buffer !== undefined &&
      playing
    ) {
      const secondsPerBeat = 60.0 / bpm;
      const currentDivisions = beats[currentBeatIdx].subDivisions;
      const subDivisions = beatsFor(
        nextBeatTime,
        secondsPerBeat,
        currentDivisions,
        buffer
      );
      const doClick = () => {
        scheduleNote(audioContext, {
          time: nextBeatTime,
          gain: 1.0,
          buffer,
          pitch: 440,
          divisions: 1,
          idx: 0
        });
        subDivisions.forEach(b => {
          runAtTime(audioContext, b.time, rafWindowTime, () => {
            if (b.idx !== 0) {
              scheduleNote(audioContext, b);
            }
            setCurrentSubDivision(currentBeatIdx, b.divisions, b.idx);
          });
        });
        setNextBeatTime(R.add(secondsPerBeat));
        nextBeat();
        // I think I can click and also schedule the subdivisions here.
      };
      const rafWindowTime = 0.1;
      runAtTime(audioContext, nextBeatTime, rafWindowTime, doClick);
    }
  }, [audioContext, nextBeatTime, playing, beats, buffer]);

  // TODO - add in the display updater.

  const state: State = {
    bpm,
    playing,
    signature,
    activeSubDivisions
  };

  return {
    start,
    stop,
    state
  };
};

export const useMetronome = (
  playing: boolean,
  schedulerState: SchedulerState,
  audioContext: AudioContext | undefined
): [number | undefined, Dispatch<SetStateAction<number | undefined>>] => {
  // // TODO - don't update if the tab is in the background
  // const [nextBeatTime, setNextBeatTime] = useState<number | "waiting">(
  //   "waiting"
  // );
  const [currentBeat, setSignatureBeat] = useState<number | undefined>();
  // const {
  //   signature: { numerator }
  // } = schedulerState;

  // useEffect(() => {
  //   if (!playing) {
  //     setNextBeatTime("waiting");
  //   }
  // }, [playing]);

  // const incSignatureBeat = useCallback(
  //   () =>
  //     setSignatureBeat(oldBeat => {
  //       if (oldBeat === undefined) {
  //         return 0;
  //       }
  //       let newBeat = oldBeat + 1;
  //       if (oldBeat >= numerator - 1) {
  //         newBeat = 0;
  //       }
  //       return newBeat;
  //     }),
  //   [numerator]
  // );

  // useScheduleAhead(playing, schedulerState, setNextBeatTime, audioContext);
  // useDisplayUpdater(
  //   playing,
  //   audioContext,
  //   nextBeatTime,
  //   setNextBeatTime,
  //   incSignatureBeat
  // );

  return [currentBeat, setSignatureBeat];
};
