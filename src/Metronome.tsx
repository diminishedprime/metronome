import React, { useEffect } from "react";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import { usePersistantToggle, useSleepLock } from "./hooks";
import { Buttons, ToggleButton } from "./Common";
import * as t from "./types";

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
