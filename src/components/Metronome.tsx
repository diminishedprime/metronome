import React, { useEffect } from "react";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import { usePersistantToggle, useSleepLock } from "../hooks";
import { Buttons, ToggleButton } from "./Common";
import * as t from "../types";
import styled from "styled-components";

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
  metronome: t.Metronome;
  appSettings: t.AppSettings;
}
const Metronome: React.FC<MetronomeProps> = ({ appSettings, metronome }) => {
  const {
    state: { keepAwake }
  } = appSettings;
  const [showTuner, toggleTuner] = usePersistantToggle(
    t.LocalStorageKey.ShowTuner,
    false
  );
  const { lock, release } = useSleepLock();
  const playing = React.useMemo(() => metronome.state.playing, [
    metronome.state.playing
  ]);
  // TODO - I don't know if this is actually necessary or not.
  const bpm = React.useMemo(() => metronome.state.bpm, [metronome.state.bpm]);
  const pending = React.useMemo(() => metronome.state.pending, [
    metronome.state.pending
  ]);
  const addBPM = React.useMemo(() => {
    return metronome.addBPM;
  }, [metronome.addBPM]);
  const setBPM = React.useMemo(() => metronome.setBPM, [metronome.setBPM]);
  const toggleStart = React.useMemo(() => metronome.toggleStart, [
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
      <section className="section">
        <Dial initialValue={bpm} addDiff={addBPM}>
          <div className="has-text-centered is-size-1">{bpm}</div>
          <TempoMarking bpm={bpm} />
        </Dial>
      </section>
      <TimeSignature metronome={metronome} />
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
    </>
  );
};
export default Metronome;
