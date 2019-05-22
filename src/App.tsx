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
import { useToggle } from "./hooks";
import { Button, GrowButton, Buttons } from "./Common";
import * as serviceWorker from "./serviceWorker";

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

  const [showScales, toggleScales] = useToggle(false);
  const [showTuner, toggleTuner] = useToggle(false);
  const [showDial, toggleDial] = useToggle(true);

  // TODO - This doesn't seem to work, but I don't really know why.
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
      <TimeSignature
        playing={playing}
        signature={signature}
        setSignature={setSignature}
        activeSubDivisions={divisions}
      />
      {showDial && (
        <section className="section">
          <Dial initialValue={bpm} addDiff={addBPM}>
            <div className="has-text-centered is-size-1">{bpm}</div>
            <TempoMarking bpm={bpm} />
          </Dial>
        </section>
      )}

      <section className="section">
        <Buttons>
          {/* <SubDivisions subDivisions={subDivisions} toggle={toggleSubDivision} /> */}
          <TapIn setBPM={setBPM} />
          <GrowButton
            classes={["is-outlined", playing ? "is-danger" : "is-primary"]}
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
          <Button classes={[showDial ? "is-primary" : ""]} onClick={toggleDial}>
            Dial
          </Button>
          <Button
            classes={[showScales ? "is-primary" : ""]}
            onClick={toggleScales}
          >
            Scales
          </Button>
          <Button
            classes={[showTuner ? "is-primary" : ""]}
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
