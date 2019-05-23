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
import { usePersistantToggle } from "./hooks";
import { Button, GrowButton, Buttons } from "./Common";
import * as serviceWorker from "./serviceWorker";
import * as t from "./types";

const Metronome = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const {
    state: { playing, signature, divisions, bpm },
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
          style={{ marginBottom: "10px" }}
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
        activeSubDivisions={divisions}
      />

      <section className="section">
        <Buttons>
          <TapIn setBPM={setBPM} />
          <GrowButton
            className={`is-outlined ${playing ? "is-danger" : "is-primary"}`}
            onClick={toggleStart}
          >
            {playing ? "Stop" : "Start"}
          </GrowButton>
        </Buttons>
      </section>
      {showScales && <Scales startMetronome={start} stopMetronome={stop} />}
      {showTuner && <Tuner />}
      <nav className="navbar is-fixed-bottom has-background-light">
        <InnerBody className=" buttons is-right">
          <Button
            className={`${showDial ? "is-primary" : ""}`}
            onClick={toggleDial}
          >
            Dial
          </Button>
          <Button
            className={`${showScales ? "is-primary" : ""}`}
            onClick={toggleScales}
          >
            Scales
          </Button>
          <Button
            className={`${showTuner ? "is-primary" : ""}`}
            onClick={toggleTuner}
          >
            Tuner
          </Button>
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

const App: React.FC = () => {
  return <Metronome />;
};

export default App;
