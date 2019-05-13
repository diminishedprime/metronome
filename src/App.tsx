import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { over, set } from "ramda";
import * as R from "ramda";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import { SchedulerState } from "./types";
import { useMetronome } from "./metronome";
import TapIn from "./TapIn";
import SubDivisions from "./SubDivisions";
import Tuner from "./Tuner";

interface State {
  schedulerState: SchedulerState;
}

const subDivisionsL = (idx: number) =>
  R.lensPath(["schedulerState", "subDivisions", idx, "on"]);

const bpmL = R.lensPath(["schedulerState", "bpm"]);

const makeInitialState = (): State => ({
  schedulerState: {
    scheduleAhead: 0.2,
    audioContext: new AudioContext(),
    bpm: 120,
    signature: {
      numerator: 5,
      denominator: 4
    },
    subDivisions: [
      { on: false, pitch: 100, divisions: 2, label: "2", gain: 1.0 },
      { on: false, pitch: 200, divisions: 3, label: "3", gain: 1.0 },
      { on: false, pitch: 300, divisions: 4, label: "4", gain: 1.0 },
      { on: false, pitch: 400, divisions: 5, label: "5", gain: 1.0 },
      { on: false, pitch: 500, divisions: 6, label: "6", gain: 1.0 },
      { on: false, pitch: 600, divisions: 7, label: "7", gain: 1.0 },
      { on: false, pitch: 700, divisions: 8, label: "8", gain: 1.0 }
    ]
  }
});

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [
    {
      schedulerState,
      schedulerState: {
        bpm,
        subDivisions,
        signature,
        signature: { numerator }
      }
    },
    setState
  ] = useState(makeInitialState);

  const changeBPM = (diff: number) => () =>
    setState(
      over(
        bpmL,
        R.pipe(
          R.add(diff),
          R.clamp(1, 250)
        )
      )
    );

  const setBPM = (bpm: number) => setState(set(bpmL, R.clamp(1, 250, bpm)));

  const toggleSubDivision = (divisionIdx: number) => {
    setState(over(subDivisionsL(divisionIdx), R.not));
  };

    const [currentBeat, setCurrentBeat] = useMetronome(playing, schedulerState);
    const toggleStart = () => {
        if (playing) {
            setCurrentBeat(0);
        }
        setPlaying(R.not);
    };

    return (
        <>
            <Tuner />
            <TimeSignature signature={signature} currentBeat={currentBeat} />
            <BPMWrapper>
                <BPM>{bpm}</BPM>
                <ButtonWrapper>
                    <ChangeButton onClick={changeBPM(10)}>+10</ChangeButton>
                    <ChangeButton onClick={changeBPM(1)}>+1</ChangeButton>
                    <ChangeButton onClick={changeBPM(-1)}>-1</ChangeButton>
                    <ChangeButton onClick={changeBPM(-10)}>-10</ChangeButton>
                </ButtonWrapper>
            </BPMWrapper>
            <SubDivisions subDivisions={subDivisions} toggle={toggleSubDivision} />
            <div>
                <button onClick={toggleStart}>{playing ? "Stop" : "Start"}</button>
                <TapIn setBPM={setBPM} />
            </div>
            <TempoMarking bpm={bpm} />
            </>
    );
};

const ChangeButton = styled.button`
  margin-top: 3px;
  margin-bottom: 3px;
  width: 6vh;
  font-size: 2.5vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: auto;
  margin-bottom: auto;
`;

const BPMWrapper = styled.div`
  display: flex;
`;

const BPM = styled.div`
  text-align: center;
  font-size: 12vh;
  width: 100%;
`;

const Layout = styled.div`
  margin: 0 auto;
  max-width: 500px;
`;

const App: React.FC = () => {
  return (
    <Layout>
      <Metronome />
    </Layout>
  );
};

export default App;
