import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';

const scheduleNote = (audioContext: AudioContext, noteLength: number) => (time: number) => {
  var osc = audioContext.createOscillator();
  osc.connect(audioContext.destination);
  osc.frequency.value = 440.0;
  osc.start(time);
  osc.stop(time + noteLength);
}

const thunk = () => {
  const audioContext = new AudioContext();
  let noteLength = 0.05;
  const noteScheduler = scheduleNote(audioContext, noteLength);

  let nextNoteTime = 0.0;
  let tempo = 120;
  let current16thNote = 0;
  let scheduleAheadTime = 0.1;

  const scheduler = () => {
    while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
      noteScheduler(nextNoteTime);
      var secondsPerBeat = 60.0 / tempo;
      nextNoteTime += 0.25 * secondsPerBeat;
      current16thNote++; 
      if (current16thNote === 16) {
        current16thNote = 0;
      }
    }
  }

  let timerId: undefined | number;
  const start = () => {
    timerId = setInterval(() => {
      scheduler();
    }, 100);
  }

  const stop = () => {
    if (timerId !== undefined) {
      clearInterval(timerId);
    }
  }

  return {start, stop};
}

const IndexPage = () => {
  const [state, setState] = useState(() => ({ bpm: 90, playing: false, mCtx: thunk() }));

  const changeBPM = (diff: number) => () =>
    setState(oldState => ({ ...oldState, bpm: oldState.bpm + diff }));
  const start = () => {
    setState(oldState => {
      const isPlaying = oldState.playing;
      if (isPlaying) {
        oldState.mCtx.stop();
      } else {
        oldState.mCtx.start();
      }
      return ({ ...oldState, playing: !oldState.playing })
    });
  }

  return (
    <>
      <div>bpm: {state.bpm}</div>
      <div>playing: {state.playing + ''}</div>
      <div>
        <button onClick={start}>{state.playing ? 'Stop' : 'Start'}</button>
        <button onClick={changeBPM(10)}>+10</button>
        <button onClick={changeBPM(-10)}>-10</button>
      </div>
    </>
  );
};

const Layout = styled.div`
  margin: 0 auto;
  max-width: 40em;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <IndexPage />
    </Layout>
  );
}

export default App;
