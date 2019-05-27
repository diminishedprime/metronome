import React from "react";
import * as redux from "../redux";
import styled from "styled-components";

const SettingsWrapper = styled.section``;

const Settings: React.FC = () => {
  const keepAwake = redux.useSelector(s => s.settings.keepAwake);
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
              onChange={redux.toggleKeepAwake}
            />
            Keep screen on while metronome is running.
          </label>
        </div>
      </div>
    </SettingsWrapper>
  );
};

export default Settings;
