import React from "react";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import * as Common from "./Common";
import useMetronome from "../metronome";
import * as t from "../types";
import * as hooks from "../hooks";
import styled from "styled-components";
import * as redux from "../redux";

const FullPage = styled.div`
  margin: 0 !important;
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
`;

interface MetronomeProps {
  audioContext: t.MAudioContext;
}

const BPM = () => {
  const bpm = redux.useSelector(a => a.metronomeState.bpm);
  return <div className="has-text-centered is-size-1">{bpm}</div>;
};

const DialSection: React.FC = React.memo(() => {
  return (
    <section className="section">
      <Dial addDiff={redux.addBPM}>
        <BPM />
        <TempoMarking />
      </Dial>
    </section>
  );
});

const Metronome: React.FC<MetronomeProps> = ({ audioContext }) => {
  const pending = redux.useSelector(a => a.metronomeState.pending);
  const showTuner = redux.useSelector(a => a.settings.showTuner);

  useMetronome(audioContext);

  return (
    <>
      {pending && <FullPage>Tap to enable audio.</FullPage>}
      {showTuner && <Tuner />}
      <DialSection />
      <TimeSignature />
      <Controls />
    </>
  );
};

const Controls: React.FC = React.memo(() => {
  const playing = redux.useSelector(a => a.metronomeState.playing);
  const pending = redux.useSelector(a => a.metronomeState.pending);
  const showTuner = redux.useSelector(a => a.settings.showTuner);
  return (
    <section className="section">
      <Common.Buttons hasAddons>
        <Common.ToggleButton
          isLink
          offIsOutlined
          offIsLink
          on={showTuner}
          onClick={redux.toggleTuner}
        >
          Tuner
        </Common.ToggleButton>
        <TapIn />
        <Common.ToggleButton
          on={playing}
          offIsPrimary
          grow
          isOutlined
          isDanger
          disabled={pending}
          onClick={redux.toggleStart}
        >
          <>Stop</>
          <>Start</>
        </Common.ToggleButton>
      </Common.Buttons>
    </section>
  );
});
export default Metronome;
