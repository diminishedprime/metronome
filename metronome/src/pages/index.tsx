import * as React from 'react';
import { useState } from 'react';
import Layout from '../components/layout';

const IndexPage = () => {
  const [state, setState] = useState({ bpm: 90, playing: false });
  const changeBPM = diff => () =>
    setState(oldState => ({ ...oldState, bpm: oldState.bpm + diff }));
  const start = () =>
    setState(oldState => ({ ...oldState, playing: !oldState.playing }));
  return (
    <Layout>
      <div>bpm: {state.bpm}</div>
      <div>playing: {state.playing + ''}</div>
      <div>
        <button onClick={start}>{state.playing ? 'Stop' : 'Start'}</button>
        <button onClick={changeBPM(10)}>+10</button>
        <button onClick={changeBPM(-10)}>-10</button>
      </div>
    </Layout>
  );
};

export default IndexPage;
