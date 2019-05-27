import React, { useEffect } from "react";
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
  appSettings: t.AppSettings;
}

interface DialSectionProps {
  addBPM: (bpm: number) => void;
}

const BPM = () => {
  const bpm = redux.useSelector(a => a.metronomeState.bpm);
  return <div className="has-text-centered is-size-1">{bpm}</div>;
};

const DialSection: React.FC<DialSectionProps> = React.memo(({ addBPM }) => {
  return (
    <section className="section">
      <Dial addDiff={addBPM}>
        <BPM />
        <TempoMarking />
      </Dial>
    </section>
  );
});

const Metronome: React.FC<MetronomeProps> = ({ appSettings, audioContext }) => {
  const metronome = useMetronome(audioContext);

  const {
    state: { keepAwake }
  } = appSettings;
  const [showTuner, toggleTuner] = usePersistantToggle(
    t.LocalStorageKey.ShowTuner,
    false
  );
  const { lock, release } = useSleepLock();

  const playing = redux.useSelector(a => a.metronomeState.playing);
  const pending = redux.useSelector(a => a.metronomeState.pending);
  const addBPM = React.useCallback(metronome.addBPM, [metronome.addBPM]);
  const setBPM = React.useCallback(metronome.setBPM, [metronome.setBPM]);
  const toggleStart = React.useCallback(metronome.toggleStart, [
    metronome.toggleStart
  ]);

  useEffect(() => {
    if (keepAwake && playing) {
      lock();
    } else {
      release();
    }
  }, [playing, keepAwake, lock, release]);

  return (
    <>
      {pending && <FullPage>Tap to enable audio.</FullPage>}
      {showTuner && <Tuner />}
      <DialSection addBPM={addBPM} />
      <TimeSignature metronome={metronome} />
      <Controls
        showTuner={showTuner}
        toggleTuner={toggleTuner}
        toggleStart={toggleStart}
        playing={playing}
        setBPM={setBPM}
        pending={pending}
      />
    </>
  );
};

interface ControlsProps {
  showTuner: boolean;
  toggleTuner: () => void;
  playing: boolean;
  toggleStart: () => void;
  setBPM: (bpm: number) => void;
  pending: boolean;
}

const Controls: React.FC<ControlsProps> = React.memo(
  ({ showTuner, toggleTuner, playing, toggleStart, setBPM, pending }) => {
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
          <TapIn setBPM={setBPM} />
          <ToggleButton
            on={playing}
            offIsPrimary
            grow
            isOutlined
            isDanger
            disabled={pending}
            onClick={toggleStart}
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
