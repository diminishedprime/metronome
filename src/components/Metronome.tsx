import React from "react";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import { usePersistantToggle, useSleepLock } from "../hooks";
import { Buttons, ToggleButton } from "./Common";
import useMetronome from "../metronome";
import * as t from "../types";
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

  useMetronome(audioContext);

  // TODO: - this should be saved in appSettings.
  const [showTuner, toggleTuner] = usePersistantToggle(
    t.LocalStorageKey.ShowTuner,
    false
  );

  return (
    <>
      {pending && <FullPage>Tap to enable audio.</FullPage>}
      {showTuner && <Tuner />}
      <DialSection />
      <TimeSignature />
      <Controls showTuner={showTuner} toggleTuner={toggleTuner} />
    </>
  );
};

interface ControlsProps {
  showTuner: boolean;
  toggleTuner: () => void;
}

const Controls: React.FC<ControlsProps> = React.memo(
  ({ showTuner, toggleTuner }) => {
    const playing = redux.useSelector(a => a.metronomeState.playing);
    const pending = redux.useSelector(a => a.metronomeState.pending);
    return (
      <section className="section">
        <Buttons hasAddons>
          <ToggleButton
            isLink
            offIsOutlined
            offIsLink
            on={showTuner}
            onClick={toggleTuner}
          >
            Tuner
          </ToggleButton>
          <TapIn />
          <ToggleButton
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
          </ToggleButton>
        </Buttons>
      </section>
    );
  }
);
export default Metronome;
