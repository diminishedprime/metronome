import React from "react";
import * as t from "./types";
import * as hooks from "./hooks";

const initSettings = (): t.AppSettings["state"] => ({
  keepAwake: false
});

export const useAppSettings = (): t.AppSettings => {
  const [state, setState] = hooks.useLocalStorage<t.AppSettings["state"]>(
    t.LocalStorageKey.AppSettings,
    initSettings
  );

  const toggleKeepAwake = React.useCallback(() => {
    setState(old => ({ ...old, keepAwake: !old.keepAwake }));
  }, [setState]);

  return {
    state,
    toggleKeepAwake
  };
};
