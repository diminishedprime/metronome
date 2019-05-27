import * as redux from "redux";
import * as t from "./types";
import * as immutable from "immutable";

export enum ActionType {
  UpdateActiveBeats,
  SetActiveBeats
}

export type Action =
  | { type: ActionType.UpdateActiveBeats; value: t.Beat }
  | { type: ActionType.SetActiveBeats; value: t.ActiveBeats };

export interface ReduxState {
  activeBeats: t.ActiveBeats;
}

export const setActiveBeats = (activeBeats: t.ActiveBeats) => {
  store.dispatch({
    type: ActionType.SetActiveBeats,
    value: activeBeats
  });
};

export const updateActiveBeat = (beat: t.Beat) => {
  store.dispatch({
    type: ActionType.UpdateActiveBeats,
    value: beat
  });
};

const rootReducer = (
  store: ReduxState = { activeBeats: immutable.List() },
  action: Action
): ReduxState => {
  switch (action.type) {
    case ActionType.SetActiveBeats:
      return { ...store, activeBeats: action.value };
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
        activeBeats: store.activeBeats.setIn(
          [beat.currentBeat, beat.divisions, beat.divisionIndex],
          !old
        )
      };
    default:
      return store;
  }
};

export const store = redux.createStore(rootReducer);
