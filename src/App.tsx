import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import * as R from "ramda";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import { SchedulerState } from "./types";
import { useMetronome2 } from "./metronome";
import TapIn from "./TapIn";
import Tuner from "./Tuner";
import Dial from "./Dial";
import Scales from "./Scales";
import { useToggle } from "./hooks";
import { Button, Buttons } from "./Common";
import * as serviceWorker from "./serviceWorker";

interface State {
  schedulerState: SchedulerState;
}

const Metronome = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const metronome = useMetronome2(audioContext);
  const {
    state: { playing, signature, activeSubDivisions, bpm },
    setBPM
  } = metronome;

  useEffect(() => {
    // Initialize AudioContext as a singleton on button click.
    if (playing && audioContext === undefined) {
      setAudioContext(new AudioContext());
    }
  }, [playing, audioContext]);

  const addDiff = (diff: number) =>
    setBPM(
      R.pipe(
        R.add(diff),
        R.clamp(1, 250)
      )
    );

  const toggleStart = () => {
    if (playing) {
      metronome.stop();
    } else {
      metronome.start();
    }
  };

  const startMetronome = useCallback(metronome.start, []);

  const stopMetronome = useCallback(metronome.stop, []);

  const [showScales, toggleScales] = useToggle(false);
  const [showTuner, toggleTuner] = useToggle(false);

  const [updateAvailable, setUpdateAvailable] = useState(false);
  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        setUpdateAvailable(true);
      }
    });
  });

  const [showDial, toggleDial] = useToggle(true);

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "0 auto",
        paddingLeft: "10px",
        paddingRight: "10px"
      }}
    >
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
        signature={signature}
        activeSubDivisions={activeSubDivisions}
      />
      {showDial && (
        <section className="section">
          <Dial addDiff={addDiff}>
            <div className="has-text-centered is-size-1">{bpm}</div>
            <TempoMarking bpm={bpm} />
          </Dial>
        </section>
      )}

      <section className="section">
        <Buttons>
          {/* <SubDivisions subDivisions={subDivisions} toggle={toggleSubDivision} /> */}
          <TapIn setBPM={setBPM} />
          <Button
            style={{ flexGrow: 1 }}
            classes={["is-outlined", playing ? "is-danger" : "is-primary"]}
            onClick={toggleStart}
          >
            {playing ? "Stop" : "Start"}
          </Button>
        </Buttons>
      </section>
      {showScales && (
        <Scales startMetronome={startMetronome} stopMetronome={stopMetronome} />
      )}
      {showTuner && <Tuner />}
      <nav className="navbar is-fixed-bottom has-background-light">
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            paddingTop: "10px",
            paddingRight: "10px"
          }}
          className=" buttons is-right"
        >
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
        </div>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return <Metronome />;
};

export default App;
