import React from "react";
import TimeSignature from "./TimeSignature";
import * as hooks from "../hooks";
import * as util from "../util";
import * as t from "../types";
import * as redux from "../redux";
import * as Common from "./Common";
import useMetronome from "../metronome";

// TODO: - clean up the rendering here. It redraws way too much on a change.
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
      <Common.Buttons>
        <Common.ToggleButton on={known} isInfo onClick={toggleKnown}>
          Known
        </Common.ToggleButton>
        <Common.ToggleButton on={learning} isLink onClick={toggleLearning}>
          Learning
        </Common.ToggleButton>
      </Common.Buttons>
    </div>
  );
};

interface LearnScalesProps {
  reset: () => void;
  scaleMode: ScaleMode;
}

const LearnScales: React.FC<LearnScalesProps> = ({ reset, scaleMode }) => {
  const scales = redux.useSelector(a => a.scales);
  const [scaleKeys, setScales] = React.useState<Array<t.ScaleKey>>(() =>
    util.shuffle(
      scales
        .filter(s => {
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

  const start = redux.start();
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
  const maybeScale = scales.find(
    (s: t.Scale) => s.mode === currentKey[1] && s.pitch === currentKey[0]
  );
  React.useEffect(() => {
    if (maybeScale !== undefined) {
      redux.start(maybeScale.bpm);
    }
  }, [maybeScale, start]);
  const nextScaleText = scaleKeys.length > 1 ? "Next Scale" : "Finish";

  // TODO: - this error handling makes me sad, I should really do better.
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
          <Common.Buttons grow hasAddons>
            <Common.Button
              isDanger
              isOutlined
              grow
              onClick={() => redux.addBPMToScale(scale, -10)}
            >
              -10
            </Common.Button>
            <Common.Button
              isDanger
              isOutlined
              grow
              onClick={() => redux.addBPMToScale(scale, -1)}
            >
              -
            </Common.Button>
            <Common.Button
              isPrimary
              isOutlined
              grow
              onClick={() => redux.addBPMToScale(scale, 1)}
            >
              +
            </Common.Button>
            <Common.Button
              isPrimary
              isOutlined
              grow
              onClick={() => redux.addBPMToScale(scale, 10)}
            >
              +10
            </Common.Button>
          </Common.Buttons>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Common.Button isDanger isOutlined onClick={reset}>
            Stop
          </Common.Button>
          <Common.Button isPrimary onClick={nextScale}>
            {nextScaleText}
          </Common.Button>
        </div>
      </div>
      <TimeSignature />
    </>
  );
};

interface ScalesProps {
  audioContext: t.MAudioContext;
}

// TODO: - Add a button to start learning a new scale. This will be a scale
// that is know known and is not learning.
// TODO: - use my piano keyboard component from my blog to show 3 octaves of the
// current scale.
const Scales: React.FC<ScalesProps> = ({ audioContext }) => {
  useMetronome(audioContext);

  const [scaleMode, setScaleMode] = React.useState(ScaleMode.NOT_STARTED);
  const [showKnown, toggleShowKnown] = hooks.usePersistantToggle(
    t.LocalStorageKey.ShowKnown,
    false
  );

  React.useEffect(() => {
    if (scaleMode === ScaleMode.NOT_STARTED) {
      redux.stop();
    }
  }, [scaleMode]);

  const scales = redux.useSelector(s => s.scales);

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
            <Common.Buttons>
              <Common.Button
                onClick={() => setScaleMode(ScaleMode.KNOWN)}
                disabled={scales.find(a => a.known) === undefined}
                className="is-info is-outlined"
              >
                Start Known
              </Common.Button>
              <Common.Button
                onClick={() => setScaleMode(ScaleMode.LEARNING)}
                disabled={scales.find(s => s.learning) === undefined}
                className="is-link is-outlined"
              >
                Start Learning
              </Common.Button>
            </Common.Buttons>
          </div>
          <hr />

          <Common.Buttons>
            <Common.Button
              onClick={toggleShowKnown}
              className={`${
                showKnown ? "is-primary is-outlined" : "is-danger"
              }`}
            >
              {showKnown ? "Hide Known" : "Show Known"}
            </Common.Button>
          </Common.Buttons>
          {scales
            .filter(
              s =>
                s.mode === t.Mode.Major &&
                (showKnown ? true : s.known === false)
            )
            .map((scale: t.Scale) => (
              <ScalesGroup
                key={`${scale.pitch}-${scale.mode}`}
                {...scale}
                toggleLearning={() => redux.toggleLearning(scale)}
                toggleKnown={() => redux.toggleKnown(scale)}
              />
            ))}
          <hr />
          {scales
            .filter(
              s =>
                s.mode === t.Mode.Minor &&
                (showKnown ? true : s.known === false)
            )
            .map((scale: t.Scale) => (
              <ScalesGroup
                key={`${scale.pitch}-${scale.mode}`}
                {...scale}
                toggleLearning={() => redux.toggleLearning(scale)}
                toggleKnown={() => redux.toggleKnown(scale)}
              />
            ))}
        </div>
      ) : (
        <LearnScales
          scaleMode={scaleMode}
          reset={() => setScaleMode(ScaleMode.NOT_STARTED)}
        />
      )}
    </div>
  );
};

export default Scales;
