import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import { useMetronome } from "./metronome";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import Scales from "./Scales";
import { usePersistantToggle, useSleepLock } from "./hooks";
import { Buttons, ToggleButton } from "./Common";
import * as t from "./types";

const TopSettings = styled.section`
  display: flex;
`;

interface MetronomeProps {
  appSettings: t.AppSettings;
}

export default ({ appSettings }: MetronomeProps) => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const {
    state: { keepAwake }
  } = appSettings;
  const [showScales, toggleScales] = usePersistantToggle(
    t.LocalStorageKey.ShowScales,
    false
  );
  const [showTuner, toggleTuner] = usePersistantToggle(
    t.LocalStorageKey.ShowTuner,
    false
  );
  const [showDial, toggleDial] = usePersistantToggle(
    t.LocalStorageKey.ShowDial,
    true
  );
  const { lock, release } = useSleepLock();
  const {
    state: { playing, signature, bpm, activeDivisions },
    start,
    stop,
    toggleStart,
    setSignature,
    setBPM,
    addBPM
  } = useMetronome(audioContext);

  useEffect(() => {
    if (keepAwake && playing) {
      lock();
    } else {
      release();
    }
  }, [playing, keepAwake, lock, release]);

  // Initialize AudioContext as a singleton on first start.
  useEffect(() => {
    if (playing && audioContext === undefined) {
      setAudioContext(new AudioContext());
    }
  }, [playing, audioContext]);

  return (
    <InnerBody>
      <TopSettings className="buttons">
        <ToggleButton grow isPrimary on={showDial} onClick={toggleDial}>
          Dial
        </ToggleButton>
        <ToggleButton grow isPrimary on={showScales} onClick={toggleScales}>
          Scales
        </ToggleButton>
        <ToggleButton grow isPrimary on={showTuner} onClick={toggleTuner}>
          Tuner
        </ToggleButton>
      </TopSettings>

      {showTuner && <Tuner />}
      {showDial && (
        <section className="section">
          <Dial initialValue={bpm} addDiff={addBPM}>
            <div className="has-text-centered is-size-1">{bpm}</div>
            <TempoMarking bpm={bpm} />
          </Dial>
        </section>
      )}
      <TimeSignature
        playing={playing}
        signature={signature}
        setSignature={setSignature}
        activeBeats={activeDivisions}
      />

      <section className="section">
        <Buttons>
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
      {showScales && <Scales startMetronome={start} stopMetronome={stop} />}
    </InnerBody>
  );
};

const InnerBody = styled.div``;
