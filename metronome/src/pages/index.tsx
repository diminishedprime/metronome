import * as React from 'react';
import { useState } from 'react';
import Layout from '../components/layout';
import Worker from 'worker-loader!./timer.worker.js';

const w = new Worker();

const IndexPage = () => {
  let worker = undefined;
  // try {
  //   worker = new Worker();
  // } catch (e) {
  //   console.log('no worker for you.')
  // }
  const [state, setState] = useState({ bpm: 90, playing: false, timer: worker });
  const changeBPM = diff => () =>
    setState(oldState => ({ ...oldState, bpm: oldState.bpm + diff }));
  const start = () => {
    state.timer.postMessage({type: 'start', interval: 100});
    return setState(oldState => ({ ...oldState, playing: !oldState.playing }));
  };
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
