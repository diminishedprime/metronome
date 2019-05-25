import React, { useEffect, useState } from "react";
import TimeSignature from "./TimeSignature";
import { useLocalStorage, usePersistantToggle } from "./hooks";
import * as R from "ramda";
import { Button, Buttons, ToggleButton } from "./Common";
import { Scale, Mode, ScalesDB, ScaleKey, scaleKeys } from "./types";
import * as t from "./types";

// TODO make it where I always import * as t for types instead of pulling in the names.

enum ScaleMode {
  NOT_STARTED = "Not Started",
  LEARNING = "Learning",
  KNOWN = "Known"
}

interface Props {
  metronome: t.Metronome;
}

const getScaleByFilter = (
  scalesDB: ScalesDB,
  filter: (s: Scale) => boolean
): Scale | undefined => {
  return getScalesByFilter(scalesDB, filter)[0];
};

const getScalesByFilter = (
  scalesDB: ScalesDB,
  filter: (s: Scale) => boolean
) => {
  let scales: Scale[] = [];
  Object.entries(scalesDB).forEach(([, lilMap]) => {
    Object.entries(lilMap).forEach(([, scale]) => {
      if (filter(scale)) {
        scales.push(scale);
      }
    });
  });
  return scales;
};

const initScalesDB = (): ScalesDB => {
  const scalesDB: ScalesDB = {};
  const scaleFor = (scaleKey: ScaleKey): Scale => ({
    scaleKey,
    pitch: scaleKey[0],
    mode: scaleKey[1],
    known: false,
    learning: false,
    bpm: 60
  });

  const addScale = (key: ScaleKey): void => {
    const [pitch, mode] = key;
    let pitchMap = scalesDB[pitch];
    if (pitchMap === undefined) {
      pitchMap = {};
      scalesDB[pitch] = pitchMap;
    }
    pitchMap[mode] = scaleFor(key);
  };
  // TODO(me) - clean up scale names & add sharps.
  // Major
  for (const key of scaleKeys) {
    addScale(key);
  }
  return scalesDB;
};

const ScalesGroup = ({
  scaleKey: [pitch, mode],
  learning,
  known,
  toggleLearning,
  toggleKnown
}: Scale & { toggleLearning: () => void; toggleKnown: () => void }) => {
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
function shuffle<T>(a: Array<T>) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
}

interface LearnScalesProps {
  scalesDB: ScalesDB;
  addBPM: (s: Scale, n: number) => () => void;
  reset: () => void;
  scaleMode: ScaleMode;
  metronome: t.Metronome;
}

const LearnScales = ({
  scalesDB,
  addBPM,
  reset,
  scaleMode,
  metronome,
  metronome: { start }
}: LearnScalesProps) => {
  const [scaleKeys, setScales] = useState<Array<ScaleKey>>(() =>
    shuffle(
      getScalesByFilter(scalesDB, s => {
        if (scaleMode === ScaleMode.LEARNING) {
          return s.learning;
        } else if (scaleMode === ScaleMode.KNOWN) {
          return s.known;
        }
        return false;
      }).map(({ scaleKey }) => scaleKey)
    )
  );
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
  const maybeScale = getScaleByFilter(
    scalesDB,
    (s: Scale) => s.mode === currentKey[1] && s.pitch === currentKey[0]
  );
  useEffect(() => {
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
    <div>
      <TimeSignature metronome={metronome} />
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
        <Buttons style={{ flexGrow: 1 }}>
          <Button isDanger isOutlined grow onClick={addBPM(scale, -10)}>
            -10
          </Button>
          <Button isDanger isOutlined grow onClick={addBPM(scale, -1)}>
            -
          </Button>
          <Button isPrimary isOutlined grow onClick={addBPM(scale, 1)}>
            +
          </Button>
          <Button isPrimary isOutlined grow onClick={addBPM(scale, 10)}>
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
  );
};

// TODO - Add a button to start learning a new scale. This will be a scale
// that is know known and is not learning.
const Scales = ({ metronome }: Props) => {
  const { stop: stopMetronome } = metronome;
  const [scalesDB, setScalesDB] = useLocalStorage(
    t.LocalStorageKey.ScalesDB,
    initScalesDB
  );

  const [scaleMode, setScaleMode] = useState(ScaleMode.NOT_STARTED);

  useEffect(() => {
    if (scaleMode === ScaleMode.NOT_STARTED) {
      stopMetronome();
    }
  }, [scaleMode, stopMetronome]);

  const toggleLearning = ({ pitch, mode }: Scale) => () => {
    setScalesDB(R.over(R.lensPath([pitch, mode, "learning"]), R.not));
  };

  const toggleKnown = ({ pitch, mode }: Scale) => () => {
    setScalesDB(R.over(R.lensPath([pitch, mode, "known"]), R.not));
  };

  const [showKnown, toggleShowKnown] = usePersistantToggle(
    t.LocalStorageKey.ShowKnown,
    false
  );

  const addBPM = ({ pitch, mode }: Scale, n: number) => () => {
    setScalesDB(R.over(R.lensPath([pitch, mode, "bpm"]), R.add(n)));
  };

  return (
    <div className="box" style={{ marginTop: "10px" }}>
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
                disabled={
                  getScaleByFilter(scalesDB, s => s.known) === undefined
                }
                className="is-info is-outlined"
              >
                Start Known
              </Button>
              <Button
                onClick={() => setScaleMode(ScaleMode.LEARNING)}
                disabled={
                  getScaleByFilter(scalesDB, s => s.learning) === undefined
                }
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
          {getScalesByFilter(
            scalesDB,
            s => s.mode === Mode.Major && (showKnown ? true : s.known === false)
          ).map((scale: Scale) => (
            <ScalesGroup
              key={`${scale.pitch}-${scale.mode}`}
              {...scale}
              toggleLearning={toggleLearning(scale)}
              toggleKnown={toggleKnown(scale)}
            />
          ))}
          <hr />
          {getScalesByFilter(
            scalesDB,
            s => s.mode === Mode.Minor && (showKnown ? true : s.known === false)
          ).map((scale: Scale) => (
            <ScalesGroup
              key={`${scale.pitch}-${scale.mode}`}
              {...scale}
              toggleLearning={toggleLearning(scale)}
              toggleKnown={toggleKnown(scale)}
            />
          ))}
        </div>
      ) : (
        <LearnScales
          scaleMode={scaleMode}
          addBPM={addBPM}
          scalesDB={scalesDB}
          reset={() => setScaleMode(ScaleMode.NOT_STARTED)}
          metronome={metronome}
        />
      )}
    </div>
  );
};

export default Scales;
