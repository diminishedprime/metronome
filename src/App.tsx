import React, { useEffect } from "react";
import { useState } from "react";
import { over, set } from "ramda";
import * as R from "ramda";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import { SchedulerState, Signature } from "./types";
import { useMetronome } from "./metronome";
import TapIn from "./TapIn";
import SubDivisions from "./SubDivisions";
import Tuner from "./Tuner";
import Dial from "./Dial";
import Scales from "./Scales";
import { useLocalStorage, useToggle } from "./hooks";
import { Button, Buttons } from "./Common";
import * as serviceWorker from "./serviceWorker";

interface State {
  schedulerState: SchedulerState;
}

const subDivisionsL = (idx: number) =>
  R.lensPath(["schedulerState", "subDivisions", idx, "on"]);

const bpmL = R.lensPath(["schedulerState", "bpm"]);

const signatureL = R.lensPath(["schedulerState", "signature"]);

const makeInitialState = (): State => ({
  schedulerState: {
    scheduleAhead: 0.2,
    bpm: 120,
    signature: {
      numerator: 4,
      denominator: 4
    },
    subDivisions: [
      { on: false, pitch: 10, divisions: 2, label: "2", gain: 1.0 },
      { on: false, pitch: 20, divisions: 3, label: "3", gain: 1.0 },
      { on: false, pitch: 30, divisions: 4, label: "4", gain: 1.0 },
      { on: false, pitch: 40, divisions: 5, label: "5", gain: 1.0 }
      /* { on: false, pitch: 50, divisions: 6, label: "6", gain: 1.0 },
       * { on: false, pitch: 60, divisions: 7, label: "7", gain: 1.0 },
       * { on: false, pitch: 70, divisions: 8, label: "8", gain: 1.0 } */
    ]
  }
});

const Metronome = () => {
  const [playing, setPlaying] = useState(false);
  const [audioContext, setAudioContext] = useState(() => new AudioContext());

  useEffect(() => {
    if (playing) {
      setAudioContext(new AudioContext());
    }
  }, [playing]);

  const [
    {
      schedulerState,
      schedulerState: { bpm, subDivisions, signature }
    },
    setState
  ] = useLocalStorage("@mjh/metronome/schedulerState", makeInitialState);

  const addDiff = (diff: number) =>
    setState(
      over(
        bpmL,
        R.pipe(
          R.add(diff),
          R.clamp(1, 250)
        )
      )
    );

  const setBPM = (bpm: number) => setState(set(bpmL, R.clamp(1, 250, bpm)));

  const toggleSubDivision = (divisionIdx: number) => {
    setState(over(subDivisionsL(divisionIdx), R.not));
  };

  const [currentBeat, setCurrentBeat] = useMetronome(
    playing,
    schedulerState,
    audioContext
  );
  const toggleStart = () => {
    if (playing) {
      setCurrentBeat(0);
    }
    setPlaying(R.not);
  };

  const startMetronome = (bpm: number) => {
    setBPM(bpm);
    setPlaying(true);
  };

  const stopMetronome = () => {
    setPlaying(false);
  };

  const setSignature = (s: Signature) => {
    setState(set(signatureL, s));
  };

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

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto", padding: "10px" }}>
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
        setSignature={setSignature}
        signature={signature}
        currentBeat={currentBeat}
      />
      <section className="section">
        <Dial addDiff={addDiff}>
          <div className="has-text-centered is-size-1">{bpm}</div>
          <TempoMarking bpm={bpm} />
        </Dial>
      </section>

      <section className="section">
        <Buttons>
          <SubDivisions
            subDivisions={subDivisions}
            toggle={toggleSubDivision}
          />
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
      <nav
        className="navbar is-fixed-bottom buttons is-right"
        style={{ padding: "10px", margin: "0 auto", maxWidth: "500px" }}
      >
        <Button
          classes={[showScales ? "is-primary" : ""]}
          onClick={toggleScales}
        >
          Scales
        </Button>
        <Button classes={[showTuner ? "is-primary" : ""]} onClick={toggleTuner}>
          Tuner
        </Button>
        <div>{`v${process.env.REACT_APP_VERSION}`}</div>
      </nav>
    </div>
  );
};

const App: React.FC = () => {
  return <Metronome />;
};

export default App;
