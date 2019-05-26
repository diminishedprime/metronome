import React, { useState, useRef, useEffect, useCallback } from "react";
import * as hooks from "../hooks";
import styled from "styled-components";
import * as t from "../types";

const Outer = styled.div`
  margin: auto;
  position: relative;
  height: 300px;
  width: 300px;
  border-radius: 300px;
  display: flex;
  margin-bottom: 10px;
`;

const Inner = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: absolute;
  touch-action: none;
`;

interface Props {
  initialValue: number;
  addDiff: (diff: number) => void;
  size?: number;
}

const InfiniKnob = ({
  size = 300,
  initialValue,
  addDiff,
  children
}: React.PropsWithChildren<Props>) => {
  const [stateRadians, setRadians] = hooks.useLocalStorage(
    t.LocalStorageKey.Radians,
    (initialValue * (Math.PI * 3)) / 2
  );
  const radiansRef = useRef(Math.PI);
  useEffect(() => {
    radiansRef.current = stateRadians;
  }, [stateRadians]);

  const [mouseDown, setMouseDown] = useState(false);
  const mouseDownRef = useRef(false);
  useEffect(() => {
    mouseDownRef.current = mouseDown;
  }, [mouseDown]);

  const [totalDiff, setTotalDiff] = useState(0);
  const totalDiffRef = useRef(0);
  useEffect(() => {
    totalDiffRef.current = totalDiff;
  }, [totalDiff]);

  const knobContainer = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    e.preventDefault();
  }, []);

  const onMouseUp = useCallback((_: MouseEvent) => {
    setMouseDown(false);
  }, []);

  const addToBuffer = useCallback(
    (diff: number) => {
      const threshold = 0.2;
      if (Math.abs(totalDiffRef.current) < threshold) {
        setTotalDiff(oldDiff => oldDiff + diff);
      } else {
        addDiff(totalDiffRef.current > 0 ? -1 : 1);
        setTotalDiff(0);
      }
    },
    [addDiff]
  );

  const moveKnob = useCallback(
    (e: React.Touch | React.MouseEvent | MouseEvent) => {
      const { clientX, clientY } = e;
      const box = knobContainer.current!.getBoundingClientRect();

      const boxCenter = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2
      };
      const y = -(boxCenter.y - clientY);
      const x = -(boxCenter.x - clientX);
      const newRadians = Math.atan2(y, x);
      let diff = radiansRef.current - newRadians;
      if (diff < -Math.PI) {
        diff = -radiansRef.current - newRadians;
      } else if (diff > Math.PI) {
        diff = radiansRef.current - -newRadians;
      }
      if (diff !== 0) {
        addToBuffer(diff);
      }
      const same = newRadians === radiansRef.current;
      if (!same) {
        setRadians(newRadians);
      }
    },
    [addToBuffer, setRadians]
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (mouseDownRef.current) {
        moveKnob(e);
      }
    },
    [moveKnob]
  );

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove, onMouseUp]);

  const onTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.changedTouches;
      const t0 = t[0];
      moveKnob(t0);
    },
    [moveKnob]
  );

  const top = React.useMemo(
    () =>
      size / 2 +
      Math.sin(stateRadians) * (size / 4) +
      (Math.sin(stateRadians) * size) / 16 -
      size / 6,
    [stateRadians, size]
  );
  const left = React.useMemo(
    () =>
      size / 2 +
      Math.cos(stateRadians) * (size / 4) +
      (Math.cos(stateRadians) * size) / 16 -
      size / 6,
    [stateRadians, size]
  );

  return (
    <Outer ref={knobContainer} className="has-background-primary">
      <Inner
        className="has-background-info"
        onMouseDown={onMouseDown}
        onTouchMove={onTouchMove}
        style={{
          top,
          left
        }}
      />
      <ChildContainer>{children}</ChildContainer>
    </Outer>
  );
};

const ChildContainer = styled.div`
  align-self: center;
  margin: auto;
  z-index: 1;
  pointer-events: none;
`;

export default InfiniKnob;
