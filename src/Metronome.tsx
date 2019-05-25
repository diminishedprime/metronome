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

export default () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const {
    state: { playing, signature, bpm, activeDivisions },
    start,
    stop,
    toggleStart,
    setSignature,
    setBPM,
    addBPM
  } = useMetronome(audioContext);

  // Initialize AudioContext as a singleton on first start.
  useEffect(() => {
    if (playing && audioContext === undefined) {
      setAudioContext(new AudioContext());
    }
  }, [playing, audioContext]);

  const [wakeLock, toggleWakeLock] = useToggle(false);
  const { lock, release } = useSleepLock();

  useEffect(() => {
    if (wakeLock && playing) {
      lock();
    } else {
      release();
    }
  }, [playing, wakeLock, lock, release]);

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

  const [updateAvailable, setUpdateAvailable] = useState(false);
  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        setUpdateAvailable(true);
      }
    });
  });

  return (
    <InnerBody>
      {updateAvailable && (
        <section
          className="box is-grouped field has-addons"
          style={{ marginBottom: 10, marginTop: 10 }}
        >
          <p style={{ alignSelf: "center" }} className="control is-expanded">
            An Update is Available!
          </p>
          <Button onClick={() => window.location.reload()}>Refresh</Button>
        </section>
      )}
      <section
        className="section"
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        <h2 className="title is-2 has-text-centered">(mjh)tronome</h2>
      </section>
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
      <nav className="navbar  has-background-light" style={{ paddingTop: 10 }}>
        <InnerBody className=" buttons is-right">
          <ToggleButton isPrimary on={wakeLock} onClick={toggleWakeLock}>
            Stay Awake
          </ToggleButton>
          <ToggleButton isPrimary on={showDial} onClick={toggleDial}>
            Dial
          </ToggleButton>
          <ToggleButton isPrimary on={showScales} onClick={toggleScales}>
            Scales
          </ToggleButton>
          <ToggleButton isPrimary on={showTuner} onClick={toggleTuner}>
            Tuner
          </ToggleButton>
          <div>{`v${process.env.REACT_APP_VERSION}`}</div>
        </InnerBody>
      </nav>
    </InnerBody>
  );
};

const InnerBody = styled.div`
  max-width: 500px;
  margin: 0 auto;
  padding-left: 10px;
  padding-right: 10px;
`;
