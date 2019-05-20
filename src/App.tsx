import React, { useEffect, useCallback } from "react";
import { useState } from "react";
import { over, set } from "ramda";
import * as R from "ramda";
import TempoMarking from "./TempoMarking";
import TimeSignature from "./TimeSignature";
import { SchedulerState, Signature } from "./types";
import { useMetronome, useMetronome2 } from "./metronome";
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
  R.lensPath(["schedulerState", "signature", "subDivisions", idx, "on"]);

const bpmL = R.lensPath(["schedulerState", "bpm"]);

const signatureL = R.lensPath(["schedulerState", "signature"]);

const makeInitialState = (): State => ({
  schedulerState: {
    scheduleAhead: 0.2,
    bpm: 120,
    signature: {
      numerator: 2,
      denominator: 4,
      // This need sto be the same length as numerator.
      subDivisionOverrides: [[], []],
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
  }
});

const Metronome = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | undefined>();
  const metronome = useMetronome2(audioContext);
  const {
    state: { playing }
  } = metronome;

  useEffect(() => {
    if (playing) {
      setAudioContext(new AudioContext());
    }
  }, [playing]);

  const [
    {
      schedulerState,
      schedulerState: {
        bpm,
        signature,
        signature: { subDivisions }
      }
    },
    setState
    // TODO(mjhamrick) - update this so it overrides if there's a major version bump.
  ] = useLocalStorage("@mjh/metronome/schedulerState", makeInitialState, true);

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

  const setBPM = useCallback(
    (bpm: number) => setState(set(bpmL, R.clamp(1, 250, bpm))),
    [setState]
  );

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
      setCurrentBeat(undefined);
      metronome.stop();
    } else {
      metronome.start();
    }
  };

  const startMetronome = useCallback(metronome.start, []);

  const stopMetronome = useCallback(metronome.stop, []);

  /* const setSignature = (s: Signature) => {
   *   setState(set(signatureL, s));
   * };
   */
  const overSignature = (cb: (s: Signature) => Signature) => {
    setState(over(signatureL, cb));
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
        overSignature={overSignature}
        signature={signature}
        currentBeat={currentBeat}
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
