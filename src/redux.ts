import * as redux from "redux";
import * as t from "./types";
import * as immutable from "immutable";
import * as reactRedux from "react-redux";
import * as R from "ramda";
import * as util from "./util";

export const setPending = (action: t.RSA<boolean>) => {
  setMetronomeState(old => ({
    ...old,
    pending: applyAction(action, old.pending)
  }));
};

export const setBPM = (action: React.SetStateAction<number>) => {
  setMetronomeState(old => {
    const bpm = clampBPM(applyAction(action, old.bpm));
    util.toLocalStorage(t.LocalStorageKey.BPM, bpm);
    return { ...old, bpm };
  });
};

export const setSignature = (action: React.SetStateAction<t.TimeSignature>) => {
  setMetronomeState(old => {
    const signature = applyAction(action, old.signature);
    util.toLocalStorage(t.LocalStorageKey.TimeSignature, signature);
    return { ...old, signature };
  });
};

export const toggleLearning = (id: string) => {
  setScales(old => {
    const scale = old.find(s => s.id === id);
    if (!scale) {
      return old;
    }
    return old.remove(scale).add({ ...scale, learning: !scale.learning });
  });
};
export const toggleKnown = (id: string) => {
  setScales(old => {
    const scale = old.find(s => s.id === id);
    if (!scale) {
      return old;
    }
    return old.remove(scale).add({ ...scale, known: !scale.known });
  });
};

export const addBPMToScale = (id: string, bpm: number) => {
  setScales(old => {
    const scale = old.find(s => s.id === id);
    if (!scale) {
      return old;
    }
    return old.remove(scale).add({ ...scale, bpm: scale.bpm + bpm });
  });
};

export const updateActiveBeat = (beat: t.Beat) => {
  setActiveBeats(old => {
    const oldBeats = old.getIn([
      beat.currentBeat,
      beat.divisions,
      beat.divisionIndex
    ]);
    if (oldBeats === undefined) {
      return old;
    }
    return old.update(beat.currentBeat, a => {
      return a.update(beat.divisions, b => {
        return b.update(beat.divisionIndex, c => {
          return { ...c, isActive: !c.isActive };
        });
      });
    });
  });
};

export const setAccent = (
  beatIdx: number,
  division: t.Division,
  divisionIdx: number,
  action: t.RSA<boolean>
) => {
  setActiveBeats(old =>
    old.update(beatIdx, a => {
      return a.update(division, d => {
        return d.update(divisionIdx, dd => {
          return { ...dd, isAccented: applyAction(action, dd.isAccented) };
        });
      });
    })
  );
};

export const toggleAccent = (
  beatIdx: number,
  division: t.Division,
  divisionIdx: number
) => {
  setAccent(beatIdx, division, divisionIdx, a => !a);
};

export const toggleKeepAwake = () => {
  setKeepAwake(old => !old);
};

export const toggleTuner = () => {
  setTuner(a => !a);
};

export const addBPM = (action: number) => {
  setBPM(old => old + action);
};

export const clearActiveBeats = () => {
  setActiveBeats(abs =>
    abs.map(ab => ab.map(dd => dd.map(d => ({ ...d, isActive: false }))))
  );
};

export const clearAccents = () => {
  setActiveBeats(abs =>
    abs.map(ab => ab.map(dd => dd.map(d => ({ ...d, isAccented: false }))))
  );
};

export const updateActiveBeats = (numerator: t.Numerator) => {
  setActiveBeats(old => {
    return numerator.map((numeratorBeat, beatIndex) => {
      const oldActiveBeat = old.get(beatIndex);
      return numeratorBeat.reduce(
        (activeBeat: t.ActiveBeat, enabled, division) => {
          if (enabled) {
            // Check to see if this division was already there.
            if (oldActiveBeat && oldActiveBeat.get(division)) {
              return activeBeat.set(division, oldActiveBeat.get(division)!);
            }
            return activeBeat.set(
              division,
              immutable.List(
                R.range(0, division).map(() => ({
                  isActive: false,
                  isAccented: false
                }))
              )
            );
          } else {
            return activeBeat;
          }
        },
        immutable.Map<t.Division, t.ActiveDivision>() as t.ActiveBeat
      );
    });
  });
};

export const toggleStart = () => {
  setPlaying(a => !a);
};

export const start = (bpm?: number) => {
  if (bpm !== undefined) {
    setBPM(bpm);
  }
  setPlaying(true);
};

export const stop = () => {
  setPlaying(false);
};

const setPlaying = (action: React.SetStateAction<boolean>) => {
  setMetronomeState(old => ({
    ...old,
    playing: applyAction(action, old.playing)
  }));
};

const setKeepAwake = (action: React.SetStateAction<boolean>) => {
  setSettings(old => ({
    ...old,
    keepAwake: applyAction(action, old.keepAwake)
  }));
};

const setTuner = (action: t.RSA<boolean>) => {
  const nextValue =
    action instanceof Function
      ? action(store.getState().settings.showTuner)
      : action;
  setSettings(old => ({ ...old, showTuner: nextValue }));
};

const clampBPM = (bpm: number) => R.clamp(10, 250, bpm);

const applyAction = <T>(action: t.RSA<T>, current: T) => {
  return action instanceof Function ? action(current) : action;
};

export const setActiveBeats = (action: t.RSA<t.ActiveBeats>) => {
  const nextValue =
    action instanceof Function ? action(store.getState().activeBeats) : action;
  util.toLocalStorage(t.LocalStorageKey.ActiveBeats, nextValue);
  store.dispatch({ type: t.ActionType.SetActiveBeats, action: nextValue });
};

const setMetronomeState = (action: t.RSA<t.MetronomeState>) => {
  store.dispatch({ type: t.ActionType.SetMetronomeState, action });
};

const setSettings = (action: t.RSA<t.AppSettingsState>) => {
  const nextValue =
    action instanceof Function ? action(store.getState().settings) : action;
  util.toLocalStorage(t.LocalStorageKey.AppSettings, nextValue);
  store.dispatch({ type: t.ActionType.SetSettings, action: nextValue });
};

const setScales = (action: t.RSA<t.ScalesDB>): void => {
  const nextValue = (action instanceof Function
    ? action(store.getState().scales)
    : action
  ).sortBy(a => a.pitch);
  util.toLocalStorage(t.LocalStorageKey.ScalesDB, nextValue);
  store.dispatch({
    type: t.ActionType.SetScales,
    action: nextValue
  });
};

const defaultBeat = () => immutable.Map<t.Division, boolean>().set(1, true);

const defaultSignature = () =>
  util.fromLocalStorage(t.LocalStorageKey.TimeSignature, {
    denominator: 4,
    numerator: immutable.List([
      defaultBeat(),
      defaultBeat(),
      defaultBeat(),
      defaultBeat()
    ])
  });

const initScale = (scaleKey: t.ScaleKey): t.Scale => ({
  scaleKey,
  pitch: scaleKey[0],
  mode: scaleKey[1],
  known: false,
  learning: false,
  bpm: 60,
  id: `scaleId-${scaleKey[0]}-${scaleKey[1]}`
});

const addScale = (scalesDB: t.ScalesDB, key: t.ScaleKey): t.ScalesDB => {
  return scalesDB.add(initScale(key));
};

const initScalesDB = (): t.ScalesDB => {
  return t.scaleKeys
    .reduce(
      (scalesDB: t.ScalesDB, scaleKey) => addScale(scalesDB, scaleKey),
      immutable.OrderedSet<t.Scale>()
    )
    .sortBy(a => a.pitch);
};

const initialActiveBeats = (
  beats: immutable.List<t.EnabledDivisions>
): immutable.List<t.ActiveBeat> =>
  immutable.List(
    beats.map((enabledDivisions: t.EnabledDivisions) =>
      enabledDivisions.reduce((acc, b, d) => {
        return b
          ? acc.set(
              d,
              immutable.List(
                R.range(0, d).map(() => ({ isActive: true, isAccented: false }))
              )
            )
          : acc;
      }, immutable.Map<t.Division, t.ActiveDivision>())
    )
  );

const defaultStore = (): t.ReduxState => {
  const signature = defaultSignature();
  return {
    // TODO: hydrate this from localStorage.
    scales: util.fromLocalStorage(t.LocalStorageKey.ScalesDB, initScalesDB()),
    activeBeats: util.fromLocalStorage(
      t.LocalStorageKey.ActiveBeats,
      initialActiveBeats(signature.numerator)
    ),
    settings: util.fromLocalStorage(t.LocalStorageKey.AppSettings, {
      keepAwake: false,
      showTuner: false
    }),
    metronomeState: {
      ready: false,
      pending: true,
      bpm: util.fromLocalStorage(t.LocalStorageKey.BPM, 60),
      playing: false,
      signature: signature
    }
  };
};
// TODO: - figure out how to add a local storage thing for hydration???
const rootReducer = (
  store: t.ReduxState = defaultStore(),
  action: t.Action
): t.ReduxState => {
  switch (action.type) {
    case t.ActionType.SetActiveBeats:
      return Object.assign(store, {
        activeBeats: applyAction(action.action, store.activeBeats)
      });
    case t.ActionType.SetMetronomeState:
      return {
        ...store,
        metronomeState: applyAction(action.action, store.metronomeState)
      };
    case t.ActionType.SetSettings:
      return {
        ...store,
        settings: applyAction(action.action, store.settings)
      };
    case t.ActionType.SetScales:
      return {
        ...store,
        scales: applyAction(action.action, store.scales)
      };
    default:
      // @ts-ignore - It's too smart for us here, but this is safe.
      if (!(action.type as any).startsWith("@@redux")) {
        console.log(action, "was not handled");
      }
      return store;
  }
};

export const store = redux.createStore(rootReducer);

// TODO: - once this hook is standardized, update to use it directly.
export const useSelector = <T>(
  selector: (state: t.ReduxState) => T,
  comparisonFn?: (t1: T, t2: T) => boolean
): T => {
  return (reactRedux as any).useSelector(selector, comparisonFn);
};
