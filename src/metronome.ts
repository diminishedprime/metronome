import { useEffect, useState, useCallback, useRef } from "react";
import * as R from "ramda";
import * as t from "./types";
import { useLocalStorage, useAdvice } from "./hooks";
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
  sound.start(time);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  divisions: t.DivisionOptions[],
  buffer: AudioBuffer,
  currentBeat: number
): Array<t.Beat> => {
  return divisions.reduce((acc: t.Beat[], divisions) => {
    const noteOffset = secondsPerBeat / divisions;
    const newBeats = R.range(0, divisions).map((divisionIndex: number) => {
      const time = startOfBeatTime + divisionIndex * noteOffset;
      const beat: t.Beat = {
        time,
        pitch: 220,
        gain: 1.0 * 0.5,
        buffer,
        divisions,
        divisionIndex,
        currentBeat
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

const scheduleGroup = (
  state: React.MutableRefObject<t.State>,
  scheduleAhead: number,
  nextNoteTime: React.MutableRefObject<number>,
  buffer: AudioBuffer,
  audioContext: AudioContext,
  setDivisions: React.Dispatch<React.SetStateAction<t.Divisions>>,
  beatToSchedule: React.MutableRefObject<number>,
  nextBeat: () => void
) => {
  const {
    bpm,
    signature,
    signature: { beats }
  } = state.current;
  const beatIdx = beatToSchedule.current;
  const currentBeat = beats[beatToSchedule.current];
  // This isn't very elegant, there's probably something that's not right.
  if (currentBeat === undefined) {
    return;
  }
  const divisions = currentBeat.divisions;
  const secondsPerBeat = 60.0 / bpm;
  // TODO - instead of scheduling a whole measure, I want to make a queue of
  // notes and only schedule the ones that should happen before the next
  // setInterval is run.
  while (nextNoteTime.current < audioContext.currentTime + scheduleAhead) {
    // schedule the whole beat, I think.
    const beatData = beatsFor(
      nextNoteTime.current,
      secondsPerBeat,
      divisions,
      buffer,
      beatIdx
    );
    for (const beat of beatData) {
      // TODO - I think I shouldn't play all of the beat 1's
      scheduleNote(audioContext, beat);
      runAtTime(audioContext, beat.time, () => {
        // We only want to update the UI if important assumptions haven't
        // changed in the time this was scheduled.
        const shouldStillUpdate =
          state.current.signature === signature && state.current.playing; // stateBeforeSchedule === state.current;
        if (shouldStillUpdate) {
          setDivisions((oldDivisions: t.Divisions) => {
            const newDivisions = resetActiveSubDivisions(
              beats,
              beatIdx,
              oldDivisions[beatIdx]
            );
            const thing = newDivisions[beatIdx].find(
              d => d.divisions === beat.divisions
            );
            if (thing !== undefined) {
              thing.current = beat.divisionIndex;
            }
            return newDivisions;
          });
        }
      });
    }
    nextNoteTime.current += secondsPerBeat;
    nextBeat();
  }
};

const useScheduleAhead = (
  audioContext: AudioContext | undefined,
  state: t.State,
  setDivisions: React.Dispatch<React.SetStateAction<t.Divisions>>,
  beatToSchedule: number,
  nextBeat: () => void
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

  const beatToScheduleRef = useRef(beatToSchedule);

  useEffect(() => {
    beatToScheduleRef.current = beatToSchedule;
  }, [beatToSchedule]);

  useEffect(() => {
    if (
      delay !== undefined &&
      audioContext !== undefined &&
      buffer !== undefined
    ) {
      const initialTime = audioContext.currentTime + 0.3;
      nextNoteTimeRef.current = initialTime;
      const tick = () => {
        scheduleGroup(
          stateRef,
          scheduleAhead,
          nextNoteTimeRef,
          buffer,
          audioContext,
          setDivisions,
          beatToScheduleRef,
          nextBeat
        );
      };
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay, buffer, audioContext, nextBeat, setDivisions]);
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

const resetActiveSubDivisions = (
  beats: t.SignatureBeat[],
  currentBeatIndex?: number,
  currentBeat?: t.Division[]
): t.Divisions => {
  const b: t.Divisions = beats.map((beat: t.SignatureBeat, idx: number) => {
    if (idx === currentBeatIndex && currentBeat !== undefined) {
      return currentBeat;
    }
    return beat.divisions.map((divisions: t.DivisionOptions) => ({
      divisions,
      current: undefined,
      pitch: 220,
      gain: 1.0
    }));
  });
  return b;
};

export const useMetronome = (
  audioContext: AudioContext | undefined
): t.Metronome => {
  const clampBPM = useCallback((bpm: number) => R.clamp(10, 250, bpm), []);

  const [playing, setPlaying] = useState(false);
  const [bpm, setBPM] = useAdvice(useLocalStorage("@mjh/bpm", 90), clampBPM);
  const [beatToSchedule, setBeatToSchedule] = useState(0);
  const [signature, setSignature] = useLocalStorage<t.Signature>(
    "@mjh/saved-signature",
    {
      denominator: 4,
      beats: [{ divisions: [1] }, { divisions: [1] }, { divisions: [1] }]
    }
  );
  const [divisions, setDivisions] = useLocalStorage<t.Division[][]>(
    "@mjh/saved-divisions",
    resetActiveSubDivisions(signature.beats)
  );

  const state: t.State = {
    bpm,
    playing,
    signature,
    divisions
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

  const nextBeat = useCallback(() => {
    setBeatToSchedule(current => (current + 1) % numeratorRef.current);
  }, []);

  // Effects for updating state.

  // If the time signature changes, we need to reset the active subdivisions.
  useEffect(() => {
    // TODO - This would be fancier if when the next beat can still happen, it
    // didn't clear the active beat in the UI.
    setDivisions(resetActiveSubDivisions(beats));
    setBeatToSchedule(0);
    numeratorRef.current = beats.length;
  }, [beats, signature, setDivisions]);

  useEffect(() => {
    if (!playing) {
      setBeatToSchedule(0);
      setDivisions(resetActiveSubDivisions(beats));
      setTimeout(() => {
        setBeatToSchedule(0);
        setDivisions(resetActiveSubDivisions(beats));
      }, 100);
    }
  }, [playing, beats, setDivisions]);

  useScheduleAhead(audioContext, state, setDivisions, beatToSchedule, nextBeat);

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
