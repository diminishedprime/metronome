import React from 'react';
import {useState} from 'react';
import styled from 'styled-components';

const IndexPage = () => {
  const [state, setState] = useState({ bpm: 90, playing: false });
  const changeBPM = (diff: number) => () =>
    setState(oldState => ({ ...oldState, bpm: oldState.bpm + diff }));
  const start = () =>
    setState(oldState => ({ ...oldState, playing: !oldState.playing }));
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

const Thing = styled.div`
  margin: 0 auto;
  max-width: 40em;
`;

const App: React.FC = () => {
  return (
    <Thing>
      <IndexPage />
    </Thing>
  );
}

export default App;
