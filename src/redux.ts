import * as redux from "redux";
import * as t from "./types";
import * as immutable from "immutable";
import * as reactRedux from "react-redux";
import * as R from "ramda";
import * as metronome from "./metronome";
import * as util from "./util";

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

const setKeepAwake = (action: React.SetStateAction<boolean>) => {
  store.dispatch({ type: t.ActionType.SetKeepAwake, action });
};

export const setSignature = (action: React.SetStateAction<t.TimeSignature>) => {
  // TODO: - figure out a cleaner way to manage this.
  const nextValue =
    action instanceof Function
      ? action(store.getState().metronomeState.signature)
      : action;
  util.toLocalStorage(t.LocalStorageKey.TimeSignature, nextValue);
  store.dispatch({ type: t.ActionType.SetSignature, action: nextValue });
};

export const toggleTuner = () => {
  setTuner(a => !a);
};

const setTuner = (action: t.RSA<boolean>) => {
  const nextValue =
    action instanceof Function
      ? action(store.getState().settings.showTuner)
      : action;
  setSettings(old => ({ ...old, showTuner: nextValue }));
};

const setSettings = (action: t.RSA<t.AppSettingsState>) => {
  const nextValue =
    action instanceof Function ? action(store.getState().settings) : action;
  util.toLocalStorage(t.LocalStorageKey.AppSettings, nextValue);
  store.dispatch({ type: t.ActionType.SetSettings, action: nextValue });
};

export const setPending = (action: t.RSA<boolean>) => {
  store.dispatch({ type: t.ActionType.SetPending, action });
};

export const setPlaying = (action: React.SetStateAction<boolean>) => {
  store.dispatch({ type: t.ActionType.SetPlaying, action });
};

export const setBPM = (action: React.SetStateAction<number>) => {
  // TODO: - figure out a cleaner way to manage this.
  const nextValue = clampBPM(
    action instanceof Function
      ? action(store.getState().metronomeState.bpm)
      : action
  );
  util.toLocalStorage(t.LocalStorageKey.BPM, nextValue);
  store.dispatch({ type: t.ActionType.SetBpm, action: nextValue });
};

export const addBPM = (action: number) => {
  setBPM(old => old + action);
};

export const setActiveBeats = (action: t.RSA<t.ActiveBeats>) => {
  store.dispatch({
    type: t.ActionType.SetActiveBeats,
    action
  });
};

export const resetActivebeats = () => {
  setActiveBeats(
    metronome.resetActiveBeats(
      store.getState().metronomeState.signature.numerator
    )
  );
};

export const updateActiveBeat = (beat: t.Beat) => {
  store.dispatch({
    type: t.ActionType.UpdateActiveBeats,
    value: beat
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

const defaultBeat = immutable.Map<t.Division, boolean>().set(1, true);

const defaultSignature = util.fromLocalStorage(
  t.LocalStorageKey.TimeSignature,
  {
    denominator: 4,
    numerator: immutable.List([
      defaultBeat,
      defaultBeat,
      defaultBeat,
      defaultBeat
    ])
  }
);

const defaultStore = {
  activeBeats: metronome.resetActiveBeats(defaultSignature.numerator),
  settings: util.fromLocalStorage(t.LocalStorageKey.AppSettings, {
    keepAwake: false,
    showTuner: false
  }),
  metronomeState: {
    ready: false,
    pending: true,
    bpm: util.fromLocalStorage(t.LocalStorageKey.BPM, 60),
    playing: false,
    signature: defaultSignature
  }
};

const clampBPM = (bpm: number) => R.clamp(10, 250, bpm);

const applyAction = <T>(action: t.RSA<T>, current: T) => {
  return action instanceof Function ? action(current) : action;
};

// TODO: - figure out how to add a local storage thing for hydration???
// TODO: use applyAction for the rest of these.
const rootReducer = (
  store: t.ReduxState = defaultStore,
  action: t.Action
): t.ReduxState => {
  switch (action.type) {
    case t.ActionType.SetActiveBeats:
      return {
        ...store,
        activeBeats: applyAction(action.action, store.activeBeats)
      };
    case t.ActionType.SetKeepAwake:
      return {
        ...store,
        settings: {
          ...store.settings,
          keepAwake: applyAction(action.action, store.settings.keepAwake)
        }
      };
    case t.ActionType.UpdateActiveBeats:
      const beat = action.value;
      const old = store.activeBeats.getIn([
        beat.currentBeat,
        beat.divisions,
        beat.divisionIndex
      ]);
      if (old === undefined) {
        return store;
      }
      return {
        ...store,
        activeBeats: store.activeBeats.update(beat.currentBeat, a => {
          return a.update(beat.divisions, b => {
            return b.update(beat.divisionIndex, c => {
              return { ...c, isActive: !c.isActive };
            });
          });
        })
      };
    case t.ActionType.SetSignature:
      return {
        ...store,
        metronomeState: {
          ...store.metronomeState,
          signature:
            action.action instanceof Function
              ? action.action(store.metronomeState.signature)
              : action.action
        }
      };
    case t.ActionType.SetPending:
      return {
        ...store,
        metronomeState: {
          ...store.metronomeState,
          pending:
            action.action instanceof Function
              ? action.action(store.metronomeState.pending)
              : action.action
        }
      };
    case t.ActionType.SetPlaying:
      return {
        ...store,
        metronomeState: {
          ...store.metronomeState,
          playing:
            action.action instanceof Function
              ? action.action(store.metronomeState.playing)
              : action.action
        }
      };
    case t.ActionType.SetBpm:
      return {
        ...store,
        metronomeState: {
          ...store.metronomeState,
          bpm:
            action.action instanceof Function
              ? action.action(store.metronomeState.bpm)
              : action.action
        }
      };
    case t.ActionType.SetSettings:
      return {
        ...store,
        settings: applyAction(action.action, store.settings)
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
