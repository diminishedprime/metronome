import React from "react";
import * as t from "./types";
import { useAudioBuffer } from "./hooks";
import Deque from "double-ended-queue";
import { runAtTime } from "./util";
import * as redux from "./redux";
import { store } from "./redux";

const click = require("./click.wav");

// TODO - instead of scheduling a t.Beat, I think I should schedule a
// t.DivisionDetails
const scheduleNote = (
  audioContext: AudioContext,
  { time, gain, buffer }: t.Beat
) => {
  const sound = audioContext.createBufferSource();
  sound.buffer = buffer;

  const volume = audioContext.createGain();
  volume.gain.value = gain;

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
  const activeDeets: t.ActiveBeats = store.getState().activeBeats;
  divisions
    .filter(a => a)
    .forEach((_, divisionOption) => {
      const noteOffset = secondsPerBeat / divisionOption;
      for (
        let divisionIndex = 0;
        divisionIndex < divisionOption;
        divisionIndex++
      ) {
        const { isAccented } = activeDeets
          .get(currentBeat, t.defaultActiveBeat)
          .get(divisionOption, t.defaultActiveDivision)
          .get(divisionIndex, t.defaultDivisionDetails);
        const time = startOfBeatTime + divisionIndex * noteOffset;
        const divisionLength = noteOffset;
        const gain = isAccented ? 1.0 : 0.1 * 1.0;
        const beat: t.Beat = {
          time,
          divisionLength,
          pitch: 220,
          gain,
          buffer,
          divisions: divisionOption,
          divisionIndex,
          currentBeat,
          isAccented
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
    const toSchedule = beatsQueue.shift()!;
    if (toSchedule.time !== lastTime || toSchedule.isAccented) {
      scheduleNote(audioContext, toSchedule);
    }
    lastTime = toSchedule.time;
    updateUi(audioContext, toSchedule);
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
  const numeratorSize = redux.useSelector(
    a => a.metronomeState.signature.numerator.size
  );
  const numeratorSizeRef = React.useRef(numeratorSize);
  const playingRef = React.useRef(playing);

  const scheduleAhead = 0.3;
  const nextNoteTimeRef = React.useRef<number>(0);
  const delay = playing ? (scheduleAhead * 1000) / 2 : undefined;

  const beatToSchedule = React.useRef(0);
  React.useEffect(() => {
    if (!playing) {
      beatToSchedule.current = 0;
    }
    playingRef.current = playing;
    numeratorSizeRef.current = numeratorSize;
  }, [playing, numeratorSize]);

  const nextBeat = React.useCallback(() => {
    let old = beatToSchedule.current;
    beatToSchedule.current = (old + 1) % numeratorSizeRef.current;
  }, []);

  // TODO: - because the ui callbacks run in the future, I can get in a weird
  // spot state-wise. I should figure out a way to either cancel them running
  // when the number of divisions changes.
  const updateUi = React.useCallback(
    (audioContext: AudioContext, beat: t.Beat) => {
      // We ovewrite activeBeats here because it's definitely changing.
      runAtTime(audioContext, beat.time, () => {
        if (playingRef.current) {
          // TODO: - this is super janky.
          // TODO: - this would be much nicer with an animation.
          // TODO: - switch this to runAtTime to clear the beat it just set.
          // TODO: - If the division changes, we should reset all active beats to false.
          redux.updateActiveBeat(beat);
        }
      });
    },
    []
  );

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
    redux.clearActiveBeats();
    redux.updateActiveBeats(numerator);
  }, [numerator]);

  // If the metronome stops playing, we should reset the active beats.
  React.useEffect(() => {
    if (!playing) {
      redux.clearActiveBeats();
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
