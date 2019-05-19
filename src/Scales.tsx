import React, { useEffect, useState } from "react";

import { useLocalStorage } from "./hooks";
import * as R from "ramda";
import { Button, Buttons } from "./Common";
import { Scale, Pitch, Mode, ScalesDB } from "./types";

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
  const scaleFor = (pitch: Pitch, mode: Mode): Scale => ({
    pitch,
    mode,
    known: false,
    learning: false,
    bpm: 60
  });

  const addScale = (pitch: Pitch, mode: Mode): void => {
    let pitchMap = scalesDB[pitch];
    if (pitchMap === undefined) {
      pitchMap = {};
      scalesDB[pitch] = pitchMap;
    }
    pitchMap[mode] = scaleFor(pitch, mode);
  };
  // TODO(me) - clean up scale names & add sharps.
  // Major
  addScale(Pitch.A, Mode.Major);
  addScale(Pitch.B_Flat, Mode.Major);
  addScale(Pitch.B, Mode.Major);
  addScale(Pitch.C, Mode.Major);
  addScale(Pitch.D_Flat, Mode.Major);
  addScale(Pitch.D, Mode.Major);
  addScale(Pitch.E_Flat, Mode.Major);
  addScale(Pitch.E, Mode.Major);
  addScale(Pitch.F, Mode.Major);
  addScale(Pitch.G_Flat, Mode.Major);
  addScale(Pitch.G, Mode.Major);
  addScale(Pitch.A_Flat, Mode.Major);

  // Minor
  addScale(Pitch.A, Mode.Minor);
  addScale(Pitch.B_Flat, Mode.Minor);
  addScale(Pitch.B, Mode.Minor);
  addScale(Pitch.C, Mode.Minor);
  addScale(Pitch.D_Flat, Mode.Minor);
  addScale(Pitch.D, Mode.Minor);
  addScale(Pitch.E_Flat, Mode.Minor);
  addScale(Pitch.E, Mode.Minor);
  addScale(Pitch.F, Mode.Minor);
  addScale(Pitch.G_Flat, Mode.Minor);
  addScale(Pitch.G, Mode.Minor);
  addScale(Pitch.A_Flat, Mode.Minor);
  return scalesDB;
};

const ScalesGroup = ({
  pitch,
  mode,
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
        <Button classes={[known ? "is-info" : ""]} onClick={toggleKnown}>
          Known
        </Button>
        <Button classes={[learning ? "is-link" : ""]} onClick={toggleLearning}>
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
  const [scaleKeys, setScales] = useState<Array<[Mode, Pitch]>>(() =>
    shuffle(
      getScalesByFilter(scalesDB, s => {
        if (scaleMode === ScaleMode.LEARNING) {
          return s.learning;
        } else if (scaleMode === ScaleMode.KNOWN) {
          return s.known;
        }
        return false;
      }).map(({ mode, pitch }) => [mode, pitch])
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
    (s: Scale) => s.mode === currentKey[0] && s.pitch === currentKey[1]
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
            classes={["is-danger", "is-outlined"]}
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, -10)}
          >
            -10
          </Button>
          <Button
            classes={["is-danger", "is-outlined"]}
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, -1)}
          >
            -
          </Button>
          <Button
            classes={["is-success", "is-outlined"]}
            style={{ flexGrow: 1 }}
            onClick={addBPM(scale, 1)}
          >
            +
          </Button>
          <Button
            classes={["is-success", "is-outlined"]}
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
    "@mjh/metronome/scales-db",
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
                classes={["is-info", "is-outlined"]}
              >
                Start Known
              </Button>
              <Button
                onClick={() => setScaleMode(ScaleMode.LEARNING)}
                disabled={
                  getScaleByFilter(scalesDB, s => s.learning) === undefined
                }
                classes={["is-link", "is-outlined"]}
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
