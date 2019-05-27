import * as redux from "redux";
import * as t from "./types";
import * as immutable from "immutable";
import * as reactRedux from "react-redux";
import * as R from "ramda";
import * as metronome from "./metronome";
import * as util from "./util";

// TODO: these should live in types.
export enum ActionType {
  UpdateActiveBeats,
  SetActiveBeats,
  SetSignature,
  SetPending,
  SetPlaying,
  SetKeepAwake,
  SetBpm
}

type RSA<T> = React.SetStateAction<T>;
export type Action =
  // TODO: update the other types to use action & RSA
  | { type: ActionType.UpdateActiveBeats; value: t.Beat }
  | { type: ActionType.SetActiveBeats; value: t.ActiveBeats }
  | { type: ActionType.SetPending; action: RSA<boolean> }
  | { type: ActionType.SetPlaying; action: RSA<boolean> }
  | { type: ActionType.SetBpm; action: RSA<number> }
  | { type: ActionType.SetKeepAwake; action: RSA<boolean> }
  | { type: ActionType.SetSignature; action: RSA<t.TimeSignature> };

export interface ReduxState {
  activeBeats: t.ActiveBeats;
  metronomeState: t.MetronomeState;
  settings: t.AppSettingsState;
}

export const toggleKeepAwake = () => {
  setKeepAwake(old => !old);
};

const setKeepAwake = (action: React.SetStateAction<boolean>) => {
  store.dispatch({ type: ActionType.SetKeepAwake, action });
};

export const setSignature = (action: React.SetStateAction<t.TimeSignature>) => {
  // TODO: - figure out a cleaner way to manage this.
  const nextValue =
    action instanceof Function
      ? action(store.getState().metronomeState.signature)
      : action;
  util.toLocalStorage(t.LocalStorageKey.TimeSignature, nextValue);
  store.dispatch({ type: ActionType.SetSignature, action: nextValue });
};

export const setPending = (action: RSA<boolean>) => {
  store.dispatch({ type: ActionType.SetPending, action });
};

export const setPlaying = (action: React.SetStateAction<boolean>) => {
  store.dispatch({ type: ActionType.SetPlaying, action });
};

export const setBPM = (action: React.SetStateAction<number>) => {
  // TODO: - figure out a cleaner way to manage this.
  const nextValue = clampBPM(
    action instanceof Function
      ? action(store.getState().metronomeState.bpm)
      : action
  );
  util.toLocalStorage(t.LocalStorageKey.BPM, nextValue);
  store.dispatch({ type: ActionType.SetBpm, action: nextValue });
};

export const addBPM = (action: number) => {
  setBPM(old => old + action);
};

export const setActiveBeats = (activeBeats: t.ActiveBeats) => {
  store.dispatch({
    type: ActionType.SetActiveBeats,
    value: activeBeats
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
    type: ActionType.UpdateActiveBeats,
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

const defaultSignature = {
  denominator: 4,
  numerator: immutable.List([
    defaultBeat,
    defaultBeat,
    defaultBeat,
    defaultBeat
  ])
};
const defaultStore = {
  activeBeats: immutable.List(),
  settings: util.fromLocalStorage(t.LocalStorageKey.AppSettings, {
    keepAwake: false
  }),
  metronomeState: {
    ready: false,
    pending: true,
    bpm: util.fromLocalStorage(t.LocalStorageKey.BPM, 60),
    playing: false,
    signature: util.fromLocalStorage(
      t.LocalStorageKey.TimeSignature,
      defaultSignature
    )
  }
};

const clampBPM = (bpm: number) => R.clamp(10, 250, bpm);

const applyAction = <T>(action: RSA<T>, current: T) => {
  return action instanceof Function ? action(current) : action;
};

// TODO: - figure out how to add a local storage thing for hydration???
// TODO: use applyAction for the rest of these.
const rootReducer = (
  store: ReduxState = defaultStore,
  action: Action
): ReduxState => {
  switch (action.type) {
    case ActionType.SetActiveBeats:
      return { ...store, activeBeats: action.value };
    case ActionType.SetKeepAwake:
      return {
        ...store,
        settings: {
          ...store.settings,
          keepAwake: applyAction(action.action, store.settings.keepAwake)
        }
      };
    case ActionType.UpdateActiveBeats:
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
        activeBeats: store.activeBeats.setIn(
          [beat.currentBeat, beat.divisions, beat.divisionIndex],
          !old
        )
      };
    case ActionType.SetSignature:
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
    case ActionType.SetPending:
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
    case ActionType.SetPlaying:
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
    case ActionType.SetBpm:
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
  selector: (state: ReduxState) => T,
  comparisonFn?: (t1: T, t2: T) => boolean
): T => {
  return (reactRedux as any).useSelector(selector, comparisonFn);
};
