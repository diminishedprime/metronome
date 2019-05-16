import React, { useEffect, Props } from "react";
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
import Dial from "./Dial";
import Scales from "./Scales";
import { useLocalStorage } from "./hooks";

interface State {
  schedulerState: SchedulerState;
}

const subDivisionsL = (idx: number) =>
  R.lensPath(["schedulerState", "subDivisions", idx, "on"]);

const bpmL = R.lensPath(["schedulerState", "bpm"]);

const makeInitialState = (): State => ({
  schedulerState: {
    scheduleAhead: 0.2,
    bpm: 120,
    signature: {
      numerator: 5,
      denominator: 4
    },
    subDivisions: [
      { on: false, pitch: 10, divisions: 2, label: "2", gain: 1.0 },
      { on: false, pitch: 20, divisions: 3, label: "3", gain: 1.0 },
      { on: false, pitch: 30, divisions: 4, label: "4", gain: 1.0 },
      { on: false, pitch: 40, divisions: 5, label: "5", gain: 1.0 },
      { on: false, pitch: 50, divisions: 6, label: "6", gain: 1.0 },
      { on: false, pitch: 60, divisions: 7, label: "7", gain: 1.0 },
      { on: false, pitch: 70, divisions: 8, label: "8", gain: 1.0 }
    ]
  }
});

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(() => new AudioContext());

  useEffect(() => {
    if (playing) {
      setAudioContext(new AudioContext());
    }
  }, [playing]);

  const [showTuner, setShowTuner] = useState(false);
  const [
    {
      schedulerState,
      schedulerState: { bpm, subDivisions, signature }
    },
    setState
  ] = useLocalStorage("@mjh/metronome/schedulerState", makeInitialState);

    const addDiff = (diff: number) => setState(over(bpmL, R.pipe(R.add(diff), R.clamp(1, 250))))
    const changeBPM = (diff: number) => () => addDiff(diff)

    const setBPM = (bpm: number) => setState(set(bpmL, R.clamp(1, 250, bpm)));

    const toggleSubDivision = (divisionIdx: number) => {
        setState(over(subDivisionsL(divisionIdx), R.not));
        };

        const [currentBeat, setCurrentBeat] = useMetronome(
            playing,
            schedulerState,
            audioContext
        );
        const toggleStart = () => {
            if (playing) {
                setCurrentBeat(0);
            }
            setPlaying(R.not);
        };

        const startMetronome = (bpm: number) => {
            setBPM(bpm);
            setPlaying(true);
        };

        const stopMetronome = () => {
            setPlaying(false);
        };

        return (
            <>
                <TimeSignature signature={signature} currentBeat={currentBeat} />
                <Dial value={bpm} addDiff={addDiff} />
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
                {false && <TempoMarking bpm={bpm} />}
                <Scales startMetronome={startMetronome} stopMetronome={stopMetronome} />
                {showTuner && <Tuner />}
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
