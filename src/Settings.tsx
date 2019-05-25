import React from "react";
import * as t from "./types";
import styled from "styled-components";

interface SettingsProps {
  appSettings: t.AppSettings;
}

const SettingsWrapper = styled.section``;

const Settings: React.FC<SettingsProps> = ({ appSettings }) => {
  const {
    state: { keepAwake },
    toggleKeepAwake
  } = appSettings;
  return (
    <SettingsWrapper>
      <h2 className="is-size-4">Settings</h2>
      <div className="field">
        <div className="control">
          <label className="checkbox">
            <input
              style={{ marginRight: "5px" }}
              type="checkbox"
              checked={keepAwake}
              onChange={toggleKeepAwake}
            />
            Keep screen on while metronome is running.
          </label>
        </div>
      </div>
    </SettingsWrapper>
  );
};

export default Settings;
