import React from "react";
import * as R from "ramda";
import * as t from "./types";
import { useAudioBuffer } from "./hooks";
import Deque from "double-ended-queue";
import { runAtTime } from "./util";
import * as immutable from "immutable";
import * as redux from "./redux";
import { store } from "./redux";

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
    // TODO:: This does mean that if we have a custotm sound for each division, it could be messy on one.
    if (first.time !== lastTime) {
      scheduleNote(audioContext, first);
    }
    lastTime = first.time;
    updateUi(audioContext, first);
  }
};

// TODO: - I should clean this up if possible. It takes way too many arguments.
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

const useScheduleAhead = (audioContext: t.MAudioContext) => {
  const playing = redux.useSelector(a => a.metronomeState.playing);
  const buffer = useAudioBuffer(audioContext, click);

  const scheduleAhead = 0.3;
  const nextNoteTimeRef = React.useRef<number>(0);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;

  // TODO: this should probably be updated when the numerator changes.
  const beatToSchedule = React.useRef(0);
  React.useEffect(() => {
    if (!playing) {
      beatToSchedule.current = 0;
    }
  }, [playing]);

  const nextBeat = React.useCallback(() => {
    let old = beatToSchedule.current;
    beatToSchedule.current =
      (old + 1) % store.getState().metronomeState.signature.numerator.size;
  }, []);

  // TODO: - because the ui callbacks run in the future, I can get in a weird
  // spot state-wise. I should figure out a way to either cancel them running
  // when the number of divisions changes.
  const updateUi = React.useCallback((audioContext: AudioContext, beat: t.Beat) => {
    // We ovewrite activeBeats here because it's definitely changing.
    runAtTime(audioContext, beat.time, () => {
      if (store.getState().metronomeState.playing) {
        // TODO: - this is super janky.
        // TODO: - this would be much nicer with an animation.
        // TODO: - switch this to runAtTime to clear the beat it just set.
        // TODO: - If the division changes, we should reset all active beats to false.
        redux.updateActiveBeat(beat);
      }
    });
  }, []);

  React.useEffect(() => {
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
        const numerator = store.getState().metronomeState.signature.numerator;
        const beatIdx = Math.min(beatToSchedule.current, numerator.size - 1);
        const currentBeat = numerator.get(beatIdx);
        if (currentBeat !== undefined) {
          addBeatsToQueue(
            store.getState().metronomeState.bpm,
            nextNoteTimeRef,
            currentBeat,
            beatToSchedule.current,
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
  }, [delay, buffer, audioContext, updateUi, nextBeat]);
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

const useMetronome = (audioContext: t.MAudioContext) => {
  const playing = redux.useSelector(s => s.metronomeState.playing);

  // If the component using this hook unmounts, we need to stop the metronome.
  React.useEffect(() => {
    if (playing) {
      return () => {
        redux.stop();
      };
    }
  }, [playing]);

  // If the time signature changes, we need to reset the active subdivisions.
  const numerator = redux.useSelector(
    s => s.metronomeState.signature.numerator
  );
  React.useEffect(() => {
    // TODO: - This would be fancier if when the next beat can still happen, it
    // didn't clear the active beat in the UI.
    redux.resetActivebeats();
  }, [numerator]);

  // If the metronome stops playing, we should reset the active beats.
  React.useEffect(() => {
    if (!playing) {
      redux.resetActivebeats();
    }
  }, [playing]);

  // Once the audio context is ready, set pending to false.
  React.useEffect(() => {
    if (audioContext !== "pending" && audioContext !== undefined) {
      redux.setPending(false);
    }
  }, [audioContext]);

  useScheduleAhead(audioContext);
};
export default useMetronome;
