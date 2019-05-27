import React from "react";
import TimeSignature from "./TimeSignature";
import * as hooks from "../hooks";
import * as util from "../util";
import * as t from "../types";
import { Button, Buttons, ToggleButton } from "./Common";
import useScales from "../scales";
import useMetronome from "../metronome";

enum ScaleMode {
  NOT_STARTED = "not-started",
  KNOWN = "known",
  LEARNING = "learning"
}

const ScalesGroup = ({
  scaleKey: [pitch, mode],
  learning,
  known,
  toggleLearning,
  toggleKnown
}: t.Scale & { toggleLearning: () => void; toggleKnown: () => void }) => {
  return (
    <div className="is-grouped field has-addons">
      <div className="is-size-5 control is-expanded">
        {pitch} {mode}
      </div>
      <Buttons>
        <ToggleButton on={known} isInfo onClick={toggleKnown}>
          Known
        </ToggleButton>
        <ToggleButton on={learning} isLink onClick={toggleLearning}>
          Learning
        </ToggleButton>
      </Buttons>
    </div>
  );
};

interface LearnScalesProps {
  scales: t.Scales;
  metronome: t.Metronome;
  reset: () => void;
  scaleMode: ScaleMode;
}

const LearnScales: React.FC<LearnScalesProps> = ({
  scales,
  reset,
  scaleMode,
  metronome
}) => {
  const { getScales, getScale, addBPM } = scales;
  const [scaleKeys, setScales] = React.useState<Array<t.ScaleKey>>(() =>
    util.shuffle(
      getScales(s => {
        if (scaleMode === ScaleMode.LEARNING) {
          return s.learning;
        } else if (scaleMode === ScaleMode.KNOWN) {
          return s.known;
        }
        return false;
      })
        .valueSeq()
        .map(({ scaleKey }) => scaleKey)
        .toArray()
    )
  );

  const start = React.useCallback(metronome.start, [metronome.start]);

  const nextScale = () => {
    setScales(old => {
      const nu = old.slice(1);
      if (nu.length === 0) {
        reset();
      }
      return nu;
    });
  };

  const currentKey = scaleKeys[0] || [];
  const maybeScale = getScale(
    (s: t.Scale) => s.mode === currentKey[1] && s.pitch === currentKey[0]
  );
  React.useEffect(() => {
    if (maybeScale !== undefined) {
      start(maybeScale.bpm);
    }
  }, [maybeScale, start]);
  const nextScaleText = scaleKeys.length > 1 ? "Next Scale" : "Finish";

  // TODO - this error handling makes me sad, I should really do better.
  if (scaleKeys.length === 0) {
    return <div>No more scales</div>;
  }
  const scale = maybeScale!;
  const { mode, pitch, bpm } = scale!;

  return (
    <>
      <div className="box">
        <div
          style={{ alignSelf: "center", fontWeight: "bold" }}
          className="control is-expanded is-size-5"
        >
          {scaleMode}
        </div>
        <div style={{ display: "flex", marginBottom: "5px" }}>
          <div style={{ alignSelf: "center", marginRight: "10px" }}>
            {pitch} {mode} @ {bpm}bpm
          </div>
          <Buttons grow hasAddons>
            <Button isDanger isOutlined grow onClick={() => addBPM(scale, -10)}>
              -10
            </Button>
            <Button isDanger isOutlined grow onClick={() => addBPM(scale, -1)}>
              -
            </Button>
            <Button isPrimary isOutlined grow onClick={() => addBPM(scale, 1)}>
              +
            </Button>
            <Button isPrimary isOutlined grow onClick={() => addBPM(scale, 10)}>
              +10
            </Button>
          </Buttons>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button isDanger isOutlined onClick={reset}>
            Stop
          </Button>
          <Button isPrimary onClick={nextScale}>
            {nextScaleText}
          </Button>
        </div>
      </div>
      <TimeSignature metronome={metronome} />
    </>
  );
};

interface ScalesProps {
  audioContext: t.MAudioContext;
}

// TODO - Add a button to start learning a new scale. This will be a scale
// that is know known and is not learning.
const Scales: React.FC<ScalesProps> = ({ audioContext }) => {
  // TODO wrap this in a useCallback.
  const metronome = useMetronome(audioContext);
  const { stop: stopMetronome } = metronome;

  const [scaleMode, setScaleMode] = React.useState(ScaleMode.NOT_STARTED);
  const [showKnown, toggleShowKnown] = hooks.usePersistantToggle(
    t.LocalStorageKey.ShowKnown,
    false
  );

  React.useEffect(() => {
    if (scaleMode === ScaleMode.NOT_STARTED) {
      stopMetronome();
    }
  }, [scaleMode, stopMetronome]);

  const scales = useScales();
  const { getScale, getScales, toggleLearning, toggleKnown } = scales;

  return (
    <div style={{ marginTop: "10px" }}>
      {scaleMode === ScaleMode.NOT_STARTED ? (
        <div style={{ marginBottom: "5px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ alignSelf: "center", fontWeight: "bold" }}
              className="control is-expanded is-size-5"
            >
              Scales
            </div>
            <Buttons>
              <Button
                onClick={() => setScaleMode(ScaleMode.KNOWN)}
                disabled={getScale(s => s.known) === undefined}
                className="is-info is-outlined"
              >
                Start Known
              </Button>
              <Button
                onClick={() => setScaleMode(ScaleMode.LEARNING)}
                disabled={getScale(s => s.learning) === undefined}
                className="is-link is-outlined"
              >
                Start Learning
              </Button>
            </Buttons>
          </div>
          <hr />

          <Buttons>
            <Button
              onClick={toggleShowKnown}
              className={`${
                showKnown ? "is-primary is-outlined" : "is-danger"
              }`}
            >
              {showKnown ? "Hide Known" : "Show Known"}
            </Button>
          </Buttons>
          {getScales(
            s =>
              s.mode === t.Mode.Major && (showKnown ? true : s.known === false)
          ).map((scale: t.Scale) => (
            <ScalesGroup
              key={`${scale.pitch}-${scale.mode}`}
              {...scale}
              toggleLearning={() => toggleLearning(scale)}
              toggleKnown={() => toggleKnown(scale)}
            />
          ))}
          <hr />
          {getScales(
            s =>
              s.mode === t.Mode.Minor && (showKnown ? true : s.known === false)
          ).map((scale: t.Scale) => (
            <ScalesGroup
              key={`${scale.pitch}-${scale.mode}`}
              {...scale}
              toggleLearning={() => toggleLearning(scale)}
              toggleKnown={() => toggleKnown(scale)}
            />
          ))}
        </div>
      ) : (
        <LearnScales
          scaleMode={scaleMode}
          scales={scales}
          reset={() => setScaleMode(ScaleMode.NOT_STARTED)}
          metronome={metronome}
        />
      )}
    </div>
  );
};

export default Scales;
