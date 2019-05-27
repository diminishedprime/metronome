import React, { useEffect, useCallback, useRef } from "react";
import * as R from "ramda";
import * as t from "./types";
import { useAudioBuffer } from "./hooks";
import Deque from "double-ended-queue";
import { runAtTime } from "./util";
import * as immutable from "immutable";
import * as redux from "./redux";

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

let lastTime = -1;
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
    // Since the beats are sorted by time in the queue, we can use this trick to
    // only schedule one for each click.
    // TODO - This does mean that if we have a custotm sound for each division, it could be messy on one.
    if (first.time !== lastTime) {
      scheduleNote(audioContext, first);
    }
    lastTime = first.time;
    updateUi(audioContext, first);
  }
};

// TODO - I should clean this up if possible. It takes way too many arguments.
const addBeatsToQueue = (
  bpm: number,
  nextNoteTime: React.MutableRefObject<number>,
  currentBeat: t.EnabledDivisions,
  beatIdx: number,
  currentTime: number,
  scheduleAhead: number,
  buffer: AudioBuffer,
  beatsQueue: Deque<t.Beat>,
  nextBeat: () => void
) => {
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

const useSelectorRef = <T>(selector: (a: redux.ReduxState) => T) => {
  const val = redux.useSelector(selector);
  const valRef = React.useRef(val);
  React.useEffect(() => {
    valRef.current = val;
  }, [val]);
  return valRef;
};

const useScheduleAhead = (audioContext: t.MAudioContext) => {
  const playing = redux.useSelector(a => a.metronomeState.playing);
  const playingRef = useSelectorRef(a => a.metronomeState.playing);
  const bpmRef = useSelectorRef(a => a.metronomeState.bpm);
  const numeratorRef = useSelectorRef(
    a => a.metronomeState.signature.numerator
  );
  const numberOfBeatsRef = useSelectorRef(
    a => a.metronomeState.signature.numerator.size
  );
  const buffer = useAudioBuffer(audioContext, click);

  const scheduleAhead = 0.3;
  const nextNoteTimeRef = useRef<number>(0);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;

  const beatToScheduleRef = useRef(0);
  useEffect(() => {
    if (!playing) {
      beatToScheduleRef.current = 0;
    }
  }, [playing]);

  const nextBeat = React.useCallback(() => {
    let old = beatToScheduleRef.current;
    beatToScheduleRef.current = (old + 1) % numberOfBeatsRef.current;
  }, [numberOfBeatsRef]);

  // TODO - because the ui callbacks run in the future, I can get in a weird
  // spot state-wise. I should figure out a way to either cancel them running
  // when the number of divisions changes.
  const updateUi = useCallback(
    (audioContext: AudioContext, beat: t.Beat) => {
      // We ovewrite activeBeats here because it's definitely changing.
      runAtTime(audioContext, beat.time, () => {
        if (playingRef.current) {
          // TODO - this is super janky.
          // TODO - this would be much nicer with an animation.
          // TODO - switch this to runAtTime to clear the beat it just set.
          // TODO - If the division changes, we should reset all active beats to false.
          redux.updateActiveBeat(beat);
        }
      });
    },
    [playingRef]
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
        const beatIdx = Math.min(
          beatToScheduleRef.current,
          numberOfBeatsRef.current - 1
        );
        const currentBeat = numeratorRef.current.get(beatIdx);
        if (currentBeat !== undefined) {
          addBeatsToQueue(
            bpmRef.current,
            nextNoteTimeRef,
            currentBeat,
            beatToScheduleRef.current,
            audioContext.currentTime,
            scheduleAhead,
            buffer,
            beatsQueue,
            nextBeat
          );
        }
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
    updateUi,
    bpmRef,
    numberOfBeatsRef,
    numeratorRef,
    nextBeat
  ]);
};

export const resetActiveBeats = (
  beats: immutable.List<t.EnabledDivisions>
): immutable.List<t.ActiveBeat> =>
  immutable.List(
    beats.map((enabledDivisions: t.EnabledDivisions) =>
      enabledDivisions.reduce((acc, b, d) => {
        return b
          ? acc.set(d, immutable.List(R.range(0, d).map(() => true)))
          : acc;
      }, immutable.Map<t.Division, immutable.List<boolean>>())
    )
  );

const useMetronome = (audioContext: t.MAudioContext): t.Metronome => {
  // If the time signature changes, we need to reset the active subdivisions.
  const numerator = redux.useSelector(
    s => s.metronomeState.signature.numerator
  );
  const playing = redux.useSelector(s => s.metronomeState.playing);

  useEffect(() => {
    // TODO - This would be fancier if when the next beat can still happen, it
    // didn't clear the active beat in the UI.
    redux.resetActivebeats();
  }, [numerator]);

  useEffect(() => {
    if (!playing) {
      redux.resetActivebeats();
      setTimeout(() => {
        redux.resetActivebeats();
      }, 300);
    }
  }, [playing]);

  useScheduleAhead(audioContext);

  // External API Things.
  const addBPM = React.useCallback((bpmToAdd: number) => {
    redux.setBPM(R.add(bpmToAdd));
  }, []);

  const toggleStart = React.useCallback(() => redux.setPlaying(R.not), []);

  const start = useCallback((bpm?: number) => {
    if (bpm !== undefined) {
      redux.setBPM(bpm);
    }
    redux.setPlaying(true);
  }, []);

  const stop = React.useCallback(() => {
    redux.setPlaying(false);
  }, []);

  const setSignature = React.useCallback(redux.setSignature, []);
  const setBPM = React.useCallback(redux.setBPM, []);

  return {
    toggleStart,
    setSignature,
    start,
    stop,
    setBPM,
    addBPM
  };
};
export default useMetronome;
