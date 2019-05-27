import React from "react";
import * as t from "./types";
import * as hooks from "./hooks";
import * as immutable from "immutable";

const initScale = (scaleKey: t.ScaleKey): t.Scale => ({
  scaleKey,
  pitch: scaleKey[0],
  mode: scaleKey[1],
  known: false,
  learning: false,
  bpm: 60
});

const addScale = (scalesDB: t.ScalesDB, key: t.ScaleKey): t.ScalesDB => {
  return scalesDB.add(initScale(key));
};

const initScalesDB = (): t.ScalesDB => {
  return t.scaleKeys.reduce(
    (scalesDB: t.ScalesDB, scaleKey) => addScale(scalesDB, scaleKey),
    immutable.Set() as t.ScalesDB
  );
};

export const getScale = (
  scalesDB: t.ScalesDB,
  filter: (s: t.Scale) => boolean
): t.Scale | undefined => {
  return getScales(scalesDB, filter).first();
};

const getScales = (scalesDB: t.ScalesDB, filter: (s: t.Scale) => boolean) => {
  return scalesDB.filter(filter);
};

const useScales = (): t.Scales => {
  const [scalesDB, setScalesDB] = hooks.useLocalStorage<t.ScalesDB>(
    t.LocalStorageKey.ScalesDB,
    initScalesDB
  );

  const addScalePublic = React.useCallback(() => {
    throw new Error("not implemented");
  }, []);

  const getScalePublic = React.useCallback(
    (filter: (s: t.Scale) => boolean) => getScale(scalesDB, filter),
    [scalesDB]
  );

  const getScalesPublic = React.useCallback(
    (filter: (s: t.Scale) => boolean) =>
      getScales(scalesDB, filter).sort((a, b) =>
        a.scaleKey[0].localeCompare(b.scaleKey[0])
      ),
    [scalesDB]
  );

  const addBPMPublic = React.useCallback(
    (s: t.Scale, bpm: number) => {
      const scale = scalesDB.get(s);
      if (scale) {
        setScalesDB(
          scalesDB.remove(scale).add({ ...scale, bpm: scale.bpm + bpm })
        );
      }
    },
    [scalesDB, setScalesDB]
  );
  const toggleLearningPublic = React.useCallback(
    (s: t.Scale) => {
      const scale = scalesDB.get(s);
      if (scale) {
        setScalesDB(
          scalesDB.remove(scale).add({ ...scale, learning: !scale.learning })
        );
      }
    },
    [scalesDB, setScalesDB]
  );
  const toggleKnownPublic = React.useCallback(
    (s: t.Scale) => {
      const scale = scalesDB.get(s);
      if (scale) {
        setScalesDB(
          scalesDB.remove(scale).add({ ...scale, known: !scale.known })
        );
      }
    },
    [scalesDB, setScalesDB]
  );

  // TODO - these should probably use a ref so they don't change as often.
  return {
    addBPM: addBPMPublic,
    toggleLearning: toggleLearningPublic,
    toggleKnown: toggleKnownPublic,
    addScale: addScalePublic,
    getScale: getScalePublic,
    getScales: getScalesPublic
  };
};
export default useScales;
