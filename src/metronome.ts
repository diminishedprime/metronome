import { useEffect, useState, useCallback, useRef } from "react";
import * as R from "ramda";
import * as t from "./types";
const click = require("./click.wav");

const scheduleNote = (
  audioContext: AudioContext,
  { time, gain, buffer, pitch }: t.Beat
) => {
  const sound = audioContext.createBufferSource();
  sound.buffer = buffer;
  sound.detune.value = -pitch;

  const volume = audioContext.createGain();
  volume.gain.value = gain;

  sound.connect(volume);
  volume.connect(audioContext.destination);
  const difference = (audioContext.currentTime - time) * 1000;
  console.log({ difference });
  sound.start(time);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  divisions: t.Divisions[],
  buffer: AudioBuffer
): Array<t.Beat> => {
  return divisions.reduce((acc: t.Beat[], divisions) => {
    const noteOffset = secondsPerBeat / divisions;
    const newBeats = R.range(0, divisions).map((idx: number) => {
      const time = startOfBeatTime + idx * noteOffset;
      const beat: t.Beat = {
        time,
        pitch: 220,
        gain: 1.0 * 0.5,
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
    // window.requestAnimationFrame(() =>
    //                              runAtTime(audioContext, timeToRun, rafWindowTime, callback)
    //                             );
    setTimeout(
      () => runAtTime(audioContext, timeToRun, rafWindowTime, callback),
      0
    );
  } else {
    const sleepTime = ((timeToRun - now) / 2) * 1000;
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

const resetActiveSubDivisions = (beats: t.SignatureBeat[]) => {
  return beats.map((beat: t.SignatureBeat) => {
    return beat.divisions.map((divisions: t.Divisions) => ({
      divisions,
      current: undefined,
      pitch: 220,
      gain: 1.0
    }));
  });
};

export const useMetronome2 = (
  audioContext: AudioContext | undefined
): t.Metronome => {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBPM] = useState(90);
  const [currentBeatIdx, setCurrentBeatIdx] = useState<number>();
  const [signature] = useState<t.Signature>({
    numerator: 3,
    denominator: 4,
    beats: [{ divisions: [1, 2] }, { divisions: [1, 3] }, { divisions: [1, 4] }]
  });
  const [activeSubDivisions, setActiveSubDivisions] = useState<t.Division[][]>(
    resetActiveSubDivisions(signature.beats)
  );
  const [nextBeatTime, setNextBeatTime] = useState();

  const buffer = useAudioBuffer(audioContext, click);

  const bpmRef = useRef(bpm);
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  const { numerator, beats } = signature;

  useEffect(() => {
    if (currentBeatIdx !== undefined && !playing) {
      setCurrentBeatIdx(undefined);
      // TODO - there's probably a better way to do this, but this works for
      // now. I need a clean way to tell a scheduled note that it shouldn't play
      // after all.
      setTimeout(() => {
        console.log("timeout!");
        setActiveSubDivisions(resetActiveSubDivisions(beats));
      }, (60 / bpmRef.current) * 2000 + 100);
    }
  }, [playing, currentBeatIdx, beats]);

  useEffect(() => {
    setActiveSubDivisions(resetActiveSubDivisions(beats));
  }, [beats]);

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

  const nextBeat = useCallback(() => {
    setCurrentBeatIdx((current = 0) => {
      const nextBeat = (current + 1) % numerator;
      return nextBeat;
    });
  }, [numerator]);

  // TODO - lol
  const setCurrentSubDivision = (
    currentBeatIdx: number,
    divisions: t.Divisions,
    idx: number
  ) => {
    // reset the not current beat ones.
    setActiveSubDivisions(oldActiveSubs => {
      const otherLenses = R.range(0, oldActiveSubs.length)
        .filter(beatIdx => beatIdx !== currentBeatIdx)
        .map(i => R.lensIndex(i));
      return otherLenses.reduce((acc, lens) => {
        return R.over(
          lens,
          (divisions: t.Division[]) => {
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
        (oldBeatDivisions: t.Division[]) => {
          const oldBeatIdx = oldBeatDivisions.findIndex(
            (division: t.Division) => {
              return division.divisions === divisions;
            }
          );
          return R.over(
            R.lensIndex(oldBeatIdx),
            (oldDivision: t.Division) => {
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
      const secondsPerBeat = 60.0 / bpmRef.current;
      // I might just be able to set this to the last beat?
      const beatIdx = currentBeatIdx === undefined ? 0 : currentBeatIdx;
      const currentDivisions = beats[beatIdx].divisions;

      const subDivisions = beatsFor(
        nextBeatTime,
        secondsPerBeat,
        currentDivisions,
        buffer
      );
      const doClick = () => {
        nextBeat();
        subDivisions.forEach(b => {
          runAtTime(audioContext, b.time, rafWindowTime, () => {
            if (b.divisions === 1 || b.idx !== 0) {
              scheduleNote(audioContext, b);
            }

            setCurrentSubDivision(beatIdx, b.divisions, b.idx);
          });
        });
        setNextBeatTime(R.add(secondsPerBeat));
        // I think I can click and also schedule the subdivisions here.
      };
      const rafWindowTime = 0.1;
      runAtTime(audioContext, nextBeatTime, rafWindowTime, doClick);
    }
  }, [audioContext, nextBeatTime, playing, beats, buffer]);

  const state: t.State = {
    bpm,
    playing,
    signature,
    activeSubDivisions
  };

  return {
    start,
    stop,
    setBPM,
    state
  };
};
