import React, { useEffect, useState, ReactNode } from "react";
import { useLocalStorage, useToggle } from "./hooks";
import * as R from "ramda";
import styled from "styled-components";
import { Button } from "./Common";
import { Scale, Pitch, Mode, ScalesDB } from "./types";

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

const getScales = (scalesDB: ScalesDB, mode: Mode): Scale[] =>
  getScalesByFilter(scalesDB, s => s.mode === mode);

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

const initialScales: Scale[] = [];

interface ToggleGroupProps {
  title: ReactNode;
  children: ReactNode;
}

const ToggleGroup = ({ title, children }: ToggleGroupProps) => {
  const [on, toggle] = useToggle(false);
  return (
    <div>
      <div className="is-grouped field has-addons">
        <div
          style={{ alignSelf: "center", fontWeight: "bold" }}
          className="control is-expanded is-size-5"
        >
          {title}
        </div>
        <Button onClick={toggle}>{on ? "-" : "+"}</Button>
      </div>
      {on && children}
    </div>
  );
};

const ScalesGroup = ({
  pitch,
  mode,
  learning,
  toggleLearning
}: Scale & { toggleLearning: (pitch: Pitch, mode: Mode) => () => void }) => {
  return (
    <div className="is-grouped field has-addons">
      <div className="is-size-5 control is-expanded">{pitch}</div>
      <Button onClick={toggleLearning(pitch, mode)}>
        {learning ? "Stop Learning" : "Start Learning"}
      </Button>
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
  filter: (s: Scale) => boolean;
  scalesDB: ScalesDB;
  addBPM: (s: Scale, n: number) => () => void;
  startMetronome: (bpm: number) => void;
  stopMetronome: () => void;
}

const LearnScales = ({
  filter,
  scalesDB,
  addBPM,
  startMetronome,
  stopMetronome
}: LearnScalesProps) => {
  const [scaleKeys, setScales] = useState<Array<[Mode, Pitch]>>(() =>
    shuffle(
      getScalesByFilter(scalesDB, filter).map(({ mode, pitch }) => [
        mode,
        pitch
      ])
    )
  );
  const nextScale = () => {
    setScales(old => {
      const nu = old.slice(1);
      if (nu.length === 0) {
        stopMetronome();
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
  }, [maybeScale]);
  const nextScaleText = scaleKeys.length > 1 ? "Next" : "Last One";

  if (scaleKeys.length === 0) {
    return <div>No more scales</div>;
  }
  const scale = maybeScale!;
  const { mode, pitch, bpm } = scale!;
  return (
    <div className="">
      <div>
        {pitch} {mode} @ {bpm}
      </div>
      <Button style={{ flexGrow: 1 }} onClick={addBPM(scale, -1)}>
        -
      </Button>

      <Button style={{ flexGrow: 1 }} onClick={addBPM(scale, 1)}>
        +
      </Button>
      <Button classes={["is-right"]} onClick={nextScale}>
        {nextScaleText}
      </Button>
    </div>
  );
};

const Scales = ({ startMetronome, stopMetronome, ...props }: Props) => {
  // instead of saving the array, we should store them keyed by a unique
  // identifier so we can have the scales go in any order.
  const [scalesDB, setScalesDB] = useLocalStorage(
    "@mjh/metronome/scales-db",
    initScalesDB
  );

  const [started, toggleStarted] = useToggle(false);

  const majorScales = getScales(scalesDB, Mode.Major);
  const minorScales = getScales(scalesDB, Mode.Minor);

  const scaleGroups: [string, Scale[]][] = [
    [
      "Major scales (To Learn)",
      majorScales.filter(({ learning }) => !learning)
    ],
    [
      "Minor scales (To Learn)",
      minorScales.filter(({ learning }) => !learning)
    ],
    ["Major scales (Learning)", majorScales.filter(({ learning }) => learning)],
    ["Minor scales (Learning)", minorScales.filter(({ learning }) => learning)]
  ];

  const toggleLearning = (pitch: Pitch, mode: Mode) => () => {
    setScalesDB(R.over(R.lensPath([pitch, mode, "learning"]), R.not));
  };

  const addBPM = ({ pitch, mode }: Scale, n: number) => () => {
    setScalesDB(R.over(R.lensPath([pitch, mode, "bpm"]), R.add(n)));
  };

  const startStop = () => {
    if (started) {
      stopMetronome();
    }
    toggleStarted();
  };

  return (
    <div className="box">
      <Button onClick={startStop}>{started ? "Stop" : "Start Learning"}</Button>
      {!started &&
        scaleGroups.map(([heading, scales]) => (
          <ToggleGroup title={<div>{heading}</div>}>
            {scales.map((scale: Scale) => (
              <ScalesGroup
                key={`${heading}-${scale.pitch}-${scale.mode}`}
                {...scale}
                toggleLearning={toggleLearning}
              />
            ))}
          </ToggleGroup>
        ))}
      {started && (
        <LearnScales
          startMetronome={startMetronome}
          stopMetronome={stopMetronome}
          addBPM={addBPM}
          filter={(scale: Scale) => scale.learning}
          scalesDB={scalesDB}
        />
      )}
    </div>
  );
};

export default Scales;
