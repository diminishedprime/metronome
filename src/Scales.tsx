import React, { useEffect, useState } from "react";

import { useLocalStorage } from "./hooks";
import * as R from "ramda";
import { Button, Buttons } from "./Common";
import { Scale, Pitch, Mode, ScalesDB, ScaleKey, scaleKeys } from "./types";

enum ScaleMode {
  NOT_STARTED = "Not Started",
  LEARNING = "Learning",
  KNOWN = "Known"
}

interface Props {
  startMetronome: (bpm: number) => void;
  stopMetronome: () => void;
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
        <Button className={`${known ? "is-info" : ""}`} onClick={toggleKnown}>
          Known
        </Button>
        <Button
          className={`${learning ? "is-link" : ""}`}
          onClick={toggleLearning}
        >
          Learning
        </Button>
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
  startMetronome: (bpm: number) => void;
  reset: () => void;
  scaleMode: ScaleMode;
}

const LearnScales = ({
  scalesDB,
  addBPM,
  reset,
  scaleMode,
  startMetronome
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
      startMetronome(maybeScale.bpm);
    }
  }, [maybeScale, startMetronome]);
  const nextScaleText = scaleKeys.length > 1 ? "Next Scale" : "Finish";

  // TODO - this error handling makes me sad, I should really do better.
  if (scaleKeys.length === 0) {
    return <div>No more scales</div>;
  }
  const scale = maybeScale!;
  const { mode, pitch, bpm } = scale!;

  return (
    <div>
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
          <Button
            className="is-danger is-outlined"
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, -10)}
          >
            -10
          </Button>
          <Button
            className="is-danger is-outlined"
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, -1)}
          >
            -
          </Button>
          <Button
            className="is-success is-outlined"
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, 1)}
          >
            +
          </Button>
          <Button
            className="is-success is-outlined"
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, 10)}
          >
            +10
          </Button>
        </Buttons>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={reset}>Stop</Button>
        <Button onClick={nextScale}>{nextScaleText}</Button>
      </div>
    </div>
  );
};

const Scales = ({ startMetronome, stopMetronome, ...props }: Props) => {
  const [scalesDB, setScalesDB] = useLocalStorage(
    "@mjh/metronome/scales-db-2",
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

          {getScalesByFilter(scalesDB, s => s.mode === Mode.Major).map(
            (scale: Scale) => (
              <ScalesGroup
                key={`${scale.pitch}-${scale.mode}`}
                {...scale}
                toggleLearning={toggleLearning(scale)}
                toggleKnown={toggleKnown(scale)}
              />
            )
          )}
          <hr />
          {getScalesByFilter(scalesDB, s => s.mode === Mode.Minor).map(
            (scale: Scale) => (
              <ScalesGroup
                key={`${scale.pitch}-${scale.mode}`}
                {...scale}
                toggleLearning={toggleLearning(scale)}
                toggleKnown={toggleKnown(scale)}
              />
            )
          )}
        </div>
      ) : (
        <LearnScales
          scaleMode={scaleMode}
          startMetronome={startMetronome}
          addBPM={addBPM}
          scalesDB={scalesDB}
          reset={() => setScaleMode(ScaleMode.NOT_STARTED)}
        />
      )}
    </div>
  );
};

export default Scales;
