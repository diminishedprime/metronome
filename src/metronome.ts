import React, { useEffect, useState, useCallback, useRef } from "react";
import * as R from "ramda";
import * as t from "./types";
import { useLocalStorage, useAdvice, useAudioBuffer } from "./hooks";
import Deque from "double-ended-queue";
import { runAtTime } from "./util";
import * as immutable from "immutable";
const click = require("./click.wav");

const scheduleNote = (
  audioContext: AudioContext,
  { time, gain, buffer, pitch, currentBeat, divisionIndex }: t.Beat
) => {
  const isOne = currentBeat === 0 && divisionIndex === 0;
  const sound = audioContext.createBufferSource();
  sound.buffer = buffer;
  sound.detune.value = isOne ? 0 : -pitch;

  const volume = audioContext.createGain();
  volume.gain.value = isOne ? 1.0 : gain;

  sound.connect(volume);
  volume.connect(audioContext.destination);
  sound.start(time);
};

const beatsFor = (
  startOfBeatTime: number,
  secondsPerBeat: number,
  divisions: t.EnabledDivisions,
  buffer: AudioBuffer,
  currentBeat: number
): Array<t.Beat> => {
  const beats: Array<t.Beat> = [];
  divisions
    .filter(a => a)
    .forEach((_, divisionOption) => {
      const noteOffset = secondsPerBeat / divisionOption;
      for (
        let divisionIndex = 0;
        divisionIndex < divisionOption;
        divisionIndex++
      ) {
        const time = startOfBeatTime + divisionIndex * noteOffset;
        const divisionLength = noteOffset;
        const beat: t.Beat = {
          time,
          divisionLength,
          pitch: 220,
          gain: 1.0 * 0.5,
          buffer,
          divisions: divisionOption,
          divisionIndex,
          currentBeat
        };
        beats.push(beat);
      }
    });
  beats.sort((a, b) => a.time - b.time);
  return beats;
};

const playBeatsTill = (
  beatsQueue: Deque<t.Beat>,
  intervalLength: number,
  audioContext: AudioContext,
  updateUi: (audioContext: AudioContext, beat: t.Beat) => void
) => {
  const now = audioContext.currentTime;
  const scheduleTil = now + intervalLength + intervalError;
  while (beatsQueue.peekFront() && beatsQueue.peekFront()!.time < scheduleTil) {
    const first = beatsQueue.shift()!;
    if (first.divisionIndex !== 0 || first.divisions === 1) {
      scheduleNote(audioContext, first);
    }
    updateUi(audioContext, first);
  }
};

// TODO - I should clean this up if possible. It takes way too many arguments.
const addBeatsToQueue = (
  state: t.State,
  nextNoteTime: React.MutableRefObject<number>,
  currentBeat: t.EnabledDivisions,
  beatIdx: number,
  currentTime: number,
  scheduleAhead: number,
  buffer: AudioBuffer,
  beatsQueue: Deque<t.Beat>,
  nextBeat: () => void
) => {
  const { bpm } = state;
  const secondsPerBeat = 60.0 / bpm;
  const divisions = currentBeat;
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
  audioContext: t.MAudioContext,
  state: t.State,
  setActiveDivisions: React.Dispatch<
    React.SetStateAction<immutable.List<t.ActiveDivisions>>
  >
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
      old => (old + 1) % stateRef.current.signature.numerator.size
    );
  };

  // TODO - this is super janky.
  // TODO - this would be much nicer with an animation.
  // TODO - switch this to runAtTime to clear the beat it just set.
  // TODO - If the division changes, we should reset all active beats to false.
  const setActiveBeat = useCallback(
    (beat: t.Beat) => {
      setActiveDivisions(
        (oldActiveDivisions: immutable.List<t.ActiveDivisions>) => {
          const old = oldActiveDivisions.getIn([
            beat.currentBeat,
            beat.divisions,
            beat.divisionIndex
          ]);
          if (old === undefined) {
            return oldActiveDivisions;
          }
          return oldActiveDivisions.setIn(
            [beat.currentBeat, beat.divisions, beat.divisionIndex],
            !old
          );
        }
      );
    },
    [setActiveDivisions]
  );

  // TODO - because the ui callbacks run in the future, I can get in a weird
  // spot state-wise. I should figure out a way to either cancel them running
  // when the number of divisions changes.
  const updateUi = useCallback(
    (audioContext: AudioContext, beat: t.Beat) => {
      // We ovewrite activeBeats here because it's definitely changing.
      runAtTime(audioContext, beat.time, () => {
        if (stateRef.current.playing) {
          setActiveBeat(beat);
        }
      });
    },
    [setActiveBeat]
  );

  useEffect(() => {
    if (
      delay !== undefined &&
      audioContext !== undefined &&
      audioContext !== "not-supported" &&
      audioContext !== "pending" &&
      buffer !== undefined
    ) {
      const beatsQueue = new Deque<t.Beat>();
      const firstClickTime = audioContext.currentTime + 0.3;
      nextNoteTimeRef.current = firstClickTime;
      const tick = () => {
        const {
          signature: { numerator }
        } = stateRef.current;
        const beatIdx = Math.min(beatToScheduleRef.current, numerator.size - 1);
        const currentBeat = numerator.get(beatIdx)!;

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
        playBeatsTill(beatsQueue, delay / 1000, audioContext, updateUi);
      };
      tick();
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [
    delay,
    buffer,
    audioContext,
    setActiveDivisions,
    setActiveBeat,
    updateUi
  ]);
};

const resetActiveBeats = (
  beats: immutable.List<t.EnabledDivisions>
): immutable.List<t.ActiveDivisions> =>
  immutable.List(
    beats.map((enabledDivisions: t.EnabledDivisions) =>
      enabledDivisions.reduce((acc, b, d) => {
        return b
          ? acc.set(d, immutable.List(R.range(0, d).map(() => true)))
          : acc;
      }, immutable.Map<t.Division, immutable.List<boolean>>())
    )
  );

const clampBPM = (bpm: number) => R.clamp(10, 250, bpm);

const defaultBeat = immutable.Map<t.Division, boolean>().set(1, true);

export const useMetronome = (audioContext: t.MAudioContext): t.Metronome => {
  const [playing, setPlaying] = useState(false);
  const [bpm, setBPM] = useAdvice(
    useLocalStorage(t.LocalStorageKey.BPM, 90),
    clampBPM
  );
  const [signature, setSignature] = useState<t.TimeSignature>({
    denominator: 4,
    numerator: immutable.List([defaultBeat, defaultBeat, defaultBeat])
  });
  const [activeDivisions, setActiveDivisions] = useState(
    resetActiveBeats(signature.numerator)
  );

  const state: t.State = {
    bpm,
    playing,
    pending: audioContext === "pending",
    ready:
      audioContext !== undefined &&
      audioContext !== "pending" &&
      audioContext !== "not-supported",
    signature,
    activeDivisions
  };
  const { numerator } = signature;

  const bpmRef = useRef(bpm);
  useEffect(() => {
    bpmRef.current = bpm;
  }, [bpm]);

  // Effects for updating state.

  // If the time signature changes, we need to reset the active subdivisions.
  useEffect(() => {
    // TODO - This would be fancier if when the next beat can still happen, it
    // didn't clear the active beat in the UI.
    setActiveDivisions(resetActiveBeats(numerator));
  }, [numerator, signature, setActiveDivisions]);

  useEffect(() => {
    if (!playing) {
      setActiveDivisions(resetActiveBeats(numerator));
      setTimeout(() => {
        setActiveDivisions(resetActiveBeats(numerator));
      }, 300);
    }
  }, [playing, numerator, setActiveDivisions]);

  useScheduleAhead(audioContext, state, setActiveDivisions);

  // External API Things.
  const addBPM = React.useCallback(
    (bpmToAdd: number) => {
      setBPM(R.add(bpmToAdd));
    },
    [setBPM]
  );

  const toggleStart = React.useCallback(() => setPlaying(R.not), [setPlaying]);

  const start = useCallback(
    (bpm?: number) => {
      if (bpm !== undefined) {
        setBPM(bpm);
      }
      setPlaying(true);
    },
    [setPlaying, setBPM]
  );

  const stop = useCallback(() => {
    setPlaying(false);
  }, [setPlaying]);

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
