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
import { usePersistantToggle, useToggle, useSleepLock } from "./hooks";
import { Button, Buttons, ToggleButton } from "./Common";
import * as serviceWorker from "./serviceWorker";
import * as t from "./types";

const TopSettings = styled.section`
  display: flex;
`;

export default () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const [wakeLock, toggleWakeLock] = usePersistantToggle(
    t.LocalStorageKey.WakeLock,
    false
  );
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
    if (wakeLock && playing) {
      lock();
    } else {
      release();
    }
  }, [playing, wakeLock, lock, release]);

  // Initialize AudioContext as a singleton on first start.
  useEffect(() => {
    if (playing && audioContext === undefined) {
      setAudioContext(new AudioContext());
    }
  }, [playing, audioContext]);

  return (
    <InnerBody>
      <TopSettings className="buttons">
        <ToggleButton grow isPrimary on={wakeLock} onClick={toggleWakeLock}>
          Keep Awake
        </ToggleButton>
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
            on={!playing}
            offClass="is-danger"
            grow
            isOutlined
            isPrimary
            onClick={toggleStart}
          >
            <>Start</>
            <>Stop</>
          </ToggleButton>
        </Buttons>
      </section>
      {showScales && <Scales startMetronome={start} stopMetronome={stop} />}
      {showTuner && <Tuner />}
    </InnerBody>
  );
};

const InnerBody = styled.div``;
