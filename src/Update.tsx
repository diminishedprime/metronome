import React, { useState, useEffect } from "react";
import * as serviceWorker from "./serviceWorker";
import { Button } from "./Common";
import styled from "styled-components";

const UpdateStyle = styled.section`
  position: absolute;
  max-width: 50em;
  width: 95%;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
  z-index: 10;
  display: flex !important;
  justify-content: space-between;
`;

export default () => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  useEffect(() => {
    serviceWorker.register({
      onUpdate: () => {
        setUpdateAvailable(true);
      }
    });
  });
  return (
    <>
      {updateAvailable && (
        <UpdateStyle className="box">
          <span>An Update is Available!</span>
          <Button isPrimary isOutlined onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </UpdateStyle>
      )}
    </>
  );
};
