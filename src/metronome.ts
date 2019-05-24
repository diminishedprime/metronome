import { useEffect, useState, useCallback, useRef } from "react";
import * as R from "ramda";
import * as t from "./types";
import { useLocalStorage, useAdvice } from "./hooks";
import { diff } from "deep-object-diff";
import Deque from "double-ended-queue";
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
  if (time <= audioContext.currentTime) {
  }
  sound.start(time);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  divisions: t.DivisionOptions[],
  buffer: AudioBuffer,
  currentBeat: number
): Array<t.Beat> => {
  const beats = [];
  for (const divisionOptions of divisions) {
    const noteOffset = secondsPerBeat / divisionOptions;
    for (
      let divisionIndex = 0;
      divisionIndex < divisionOptions;
      divisionIndex++
    ) {
      const time = startOfBeatTime + divisionIndex * noteOffset;
      const beat: t.Beat = {
        time,
        pitch: 220,
        gain: 1.0 * 0.5,
        buffer,
        divisions: divisionOptions,
        divisionIndex,
        currentBeat
      };
      beats.push(beat);
    }
  }
  beats.sort((a, b) => a.time - b.time);
  return beats;
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

const playBeatsTill = (
  beatsQueue: Deque<t.Beat>,
  intervalLength: number,
  audioContext: AudioContext,
  updateUi: (beat: t.Beat) => void
) => {
  const now = audioContext.currentTime;
  const scheduleTil = now + intervalLength + intervalError;
  while (beatsQueue.peekFront() && beatsQueue.peekFront()!.time < scheduleTil) {
    const first = beatsQueue.shift()!;
    if (first.divisionIndex !== 0 || first.divisions === 1) {
      scheduleNote(audioContext, first);
    }
    updateUi(first);
  }
};

const addBeatsToQueue = (
  state: t.State,
  nextNoteTime: React.MutableRefObject<number>,
  currentBeat: t.SignatureBeat,
  beatIdx: number,
  currentTime: number,
  scheduleAhead: number,
  buffer: AudioBuffer,
  beatsQueue: Deque<t.Beat>,
  nextBeat: () => void
) => {
  const { bpm } = state;
  const secondsPerBeat = 60.0 / bpm;
  const divisions = currentBeat.divisions;
  // We schedule the full next measure, which means some changes, such as
  // divisions can only be updated after the last scheduled measure has
  // completed.
  if (nextNoteTime.current < currentTime + scheduleAhead) {
    const beatsForNextMeasure = beatsFor(
      nextNoteTime.current,
      secondsPerBeat,
      divisions,
      buffer,
      beatIdx
    );
    beatsQueue.push(...beatsForNextMeasure);
    nextNoteTime.current += secondsPerBeat;
    nextBeat();
  }
};

const intervalError = 0.1;

const useScheduleAhead = (
  audioContext: AudioContext | undefined,
  state: t.State,
  setActiveDivisions: React.Dispatch<React.SetStateAction<t.ActiveBeat[]>>
) => {
  const scheduleAhead = 0.3;
  const { playing } = state;
  const buffer = useAudioBuffer(audioContext, click);
  const nextNoteTimeRef = useRef<number>(0);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;

  const stateRef = useRef<t.State>(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const [beatToSchedule, setBeatToSchedule] = useState<number>(0);
  useEffect(() => {
    if (!state.playing) {
      setBeatToSchedule(0);
    }
  }, [state.playing]);

  const beatToScheduleRef = useRef(beatToSchedule);
  useEffect(() => {
    beatToScheduleRef.current = beatToSchedule;
  }, [beatToSchedule]);

  const nextBeat = () => {
    setBeatToSchedule(
      old => (old + 1) % stateRef.current.signature.beats.length
    );
  };

  const setActiveBeat = useCallback(
    (beat: t.Beat) => {
      setActiveDivisions(oldBeats => {
        const withNewBeat = R.adjust(
          beat.currentBeat,
          (activeBeat: t.ActiveBeat) => {
            return { ...activeBeat, [beat.divisions]: beat.divisionIndex };
          },
          oldBeats
        );
        let lastBeatIdx = beat.currentBeat - 1;
        if (lastBeatIdx < 0) {
          lastBeatIdx = stateRef.current.signature.beats.length - 1;
        }
        return R.adjust(
          lastBeatIdx,
          (activeBeat: t.ActiveBeat) => {
            return Object.keys(activeBeat).reduce(
              (acc, key) => ({ ...acc, [key]: undefined }),
              {}
            );
          },
          withNewBeat
        );
      });
    },
    [setActiveDivisions]
  );

  useEffect(() => {
    if (playing && beatToSchedule === 0) {
      // clear the activeBeats that don't have a corresponding signature entry.
      setActiveDivisions((activeBeats: t.ActiveBeat[]) => {
        return activeBeats;
        // console.log({
        //   activeBeats,
        //   beats: stateRef.current.signature.divisions
        // });
        // const beats = stateRef.current.signature.divisions;
        // return activeBeats.map((activeBeat: t.ActiveDivision, idx) => {
        //   const beat = beats[idx];
        //   Object.keys(activeBeat)
        //     .filter(
        //       key =>
        //         beat.divisions.indexOf(
        //           (key as unknown) as t.DivisionOptions
        //         ) !== -1
        //     )
        //     .forEach(
        //       key => delete activeBeat[(key as unknown) as t.DivisionOptions]
        //     );
        //   return activeBeat;
        // });
      });
    }
  }, [playing, beatToSchedule]);

  useEffect(() => {
    if (
      delay !== undefined &&
      audioContext !== undefined &&
      buffer !== undefined
    ) {
      const updateUi = (beat: t.Beat) => {
        // We ovewrite activeBeats here because it's definitely changing.
        runAtTime(audioContext, beat.time, () => {
          if (stateRef.current.playing) {
            setActiveBeat(beat);
          }
        });
      };

      const beatsQueue = new Deque<t.Beat>();
      const firstClickTime = audioContext.currentTime + 0.3;
      nextNoteTimeRef.current = firstClickTime;
      // We want to schedule until at least the next interval runs. The error
      // should help to not miss notes if setInterval is late.
      const tick = () => {
        // TODO - figure out how far ahead this should go, presumably it should
        // be more than the interval time in case one is late???
        const {
          signature: { beats }
        } = stateRef.current;
        const beatIdx = Math.min(beatToScheduleRef.current, beats.length - 1);
        const currentBeat = beats[beatIdx];
        if (currentBeat) {
          addBeatsToQueue(
            stateRef.current,
            nextNoteTimeRef,
            currentBeat,
            beatToScheduleRef.current,
            audioContext.currentTime,
            scheduleAhead,
            buffer,
            beatsQueue,
            nextBeat
          );
        } else {
          console.log("currentBeat was undefined", stateRef.current, {
            beatIdx
          });
          throw "hi";
        }
        playBeatsTill(beatsQueue, delay / 1000, audioContext, updateUi);
      };
      tick();
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, buffer, audioContext, setActiveDivisions, setActiveBeat]);
};

const runAtTime = (
  audioContext: AudioContext,
  timeToRun: number,
  callback: () => void
) => {
  const now = audioContext.currentTime;
  if (timeToRun <= now) {
    callback();
  } else {
    const sleepTime = ((timeToRun - now) / 2) * 1000;
    setTimeout(() => runAtTime(audioContext, timeToRun, callback), sleepTime);
  }
};

const resetActiveBeats = (beats: t.SignatureBeat[]): t.ActiveBeat[] => {
  const b: t.ActiveBeat[] = beats.map((beat: t.SignatureBeat) => {
    return beat.divisions.reduce(
      (acc: t.ActiveBeat, divisions: t.DivisionOptions) => ({
        ...acc,
        [divisions]: R.range(0, divisions).map(() => false)
      }),
      {}
    );
  });
  return b;
};

export const useMetronome = (
  audioContext: AudioContext | undefined
): t.Metronome => {
  const clampBPM = useCallback((bpm: number) => R.clamp(10, 250, bpm), []);

  const [playing, setPlaying] = useState(false);
  const [bpm, setBPM] = useAdvice(
    useLocalStorage(t.LocalStorageKey.BPM, 90),
    clampBPM
  );
  const [signature, setSignature] = useLocalStorage<t.Signature>(
    t.LocalStorageKey.Signature,
    {
      denominator: 4,
      beats: [{ divisions: [1] }, { divisions: [1] }, { divisions: [1] }]
    }
  );
  const [activeBeats, setActiveBeats] = useLocalStorage<t.ActiveBeat[]>(
    t.LocalStorageKey.ActiveBeats,
    resetActiveBeats(signature.beats)
  );

  const state: t.State = {
    bpm,
    playing,
    signature,
    activeBeats
  };
  const { beats } = signature;

  const numeratorRef = useRef(beats.length);

  const addBPM = (bpmToAdd: number) => {
    setBPM(R.add(bpmToAdd));
  };

  const bpmRef = useRef(bpm);
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  const start = useCallback(
    (bpm?: number) => {
      if (bpm !== undefined) {
        setBPM(bpm);
      }
      setPlaying(true);
    },
    [setPlaying, setBPM]
  );

  const toggleStart = () => setPlaying(R.not);

  const stop = useCallback(() => {
    setPlaying(false);
  }, [setPlaying]);

  // Effects for updating state.

  // If the time signature changes, we need to reset the active subdivisions.
  useEffect(() => {
    // TODO - This would be fancier if when the next beat can still happen, it
    // didn't clear the active beat in the UI.
    setActiveBeats(resetActiveBeats(beats));
    setTimeout(() => {
      setActiveBeats(resetActiveBeats(beats));
    }, 300);
    numeratorRef.current = beats.length;
  }, [beats, signature, setActiveBeats]);

  useEffect(() => {
    if (!playing) {
      setActiveBeats(resetActiveBeats(beats));
      setTimeout(() => {
        setActiveBeats(resetActiveBeats(beats));
      }, 300);
    }
  }, [playing, beats, setActiveBeats]);

  useScheduleAhead(audioContext, state, setActiveBeats);

  return {
    toggleStart,
    setSignature,
    start,
    stop,
    setBPM,
    addBPM,
    state
  };
};
