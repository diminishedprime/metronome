import React from "react";
import * as serviceWorker from "../serviceWorker";
import * as Common from "./Common";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
`;

const UpdateStyle = styled.section`
  position: absolute;
  max-width: ${Common.maxWidth};
  width: 95%;
  margin-top: 10px;
  left: 0;
  right: 0;
  margin-left: auto !important;
  margin-right: auto !important;
  z-index: 10;
  display: flex !important;
  justify-content: space-between;
  animation: ease-in 1s ${rotate};
`;

let hasRegistered = false;
export default () => {
  const [updateAvailable, setUpdateAvailable] = React.useState(false);

  const reload = React.useCallback(() => {
    window.location.reload();
  }, []);

  const close = React.useCallback(() => {
    setUpdateAvailable(false);
  }, []);

  React.useEffect(() => {
    if (!hasRegistered) {
      serviceWorker.register({
        onUpdate: () => {
          setUpdateAvailable(true);
        }
      });
    }
    hasRegistered = true;
  }, []);
  return (
    <>
      {updateAvailable && (
        <UpdateStyle className="box">
          <span>An Update is Available!</span>
          <Common.Buttons>
            <Common.Button isPrimary isOutlined onClick={reload}>
              Refresh
            </Common.Button>
            <Common.Button isDanger isOutlined onClick={close}>
              x
            </Common.Button>
          </Common.Buttons>
        </UpdateStyle>
      )}
    </>
  );
};
