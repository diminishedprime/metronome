import React from "react";
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

const InnerWrapper = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: absolute;
  touch-action: none;
`;

interface InnerProps {
  container: HTMLDivElement | null;
  addDiff: (value: number) => void;
  size: number;
}

const Inner: React.FC<InnerProps> = ({
  container: knobContainer,
  addDiff,
  size
}) => {
  const [stateRadians, setRadians] = hooks.useLocalStorage(
    t.LocalStorageKey.Radians,
    (Math.PI * 3) / 2
  );
  const radiansRef = React.useRef(Math.PI);
  React.useEffect(() => {
    radiansRef.current = stateRadians;
  }, [stateRadians]);
  const onMouseDown = React.useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    e.preventDefault();
  }, []);

  const [mouseDown, setMouseDown] = React.useState(false);
  const mouseDownRef = React.useRef(false);
  React.useEffect(() => {
    mouseDownRef.current = mouseDown;
  }, [mouseDown]);

  const [totalDiff, setTotalDiff] = React.useState(0);
  const totalDiffRef = React.useRef(0);
  React.useEffect(() => {
    totalDiffRef.current = totalDiff;
  }, [totalDiff]);

  const onMouseUp = React.useCallback((_: MouseEvent) => {
    setMouseDown(false);
  }, []);

  const addToBuffer = React.useCallback(
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

  const moveKnob = React.useCallback(
    (e: React.Touch | React.MouseEvent | MouseEvent) => {
      if (knobContainer !== null) {
        const { clientX, clientY } = e;
        const box = knobContainer.getBoundingClientRect();

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
      }
    },
    [addToBuffer, setRadians, knobContainer]
  );

  const onTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.changedTouches;
      const t0 = t[0];
      moveKnob(t0);
    },
    [moveKnob]
  );

  const onMouseMove = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement> | MouseEvent) => {
      if (mouseDownRef.current) {
        moveKnob(e);
      }
    },
    [moveKnob]
  );

  const uiRadians = hooks.useAnimationFrameDebounce(stateRadians);

  const top = React.useMemo(
    () =>
      size / 2 +
      Math.sin(uiRadians) * (size / 4) +
      (Math.sin(uiRadians) * size) / 16 -
      size / 6,
    [uiRadians, size]
  );
  const left = React.useMemo(
    () =>
      size / 2 +
      Math.cos(uiRadians) * (size / 4) +
      (Math.cos(uiRadians) * size) / 16 -
      size / 6,
    [uiRadians, size]
  );

  React.useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <InnerWrapper
      className="has-background-info"
      onMouseDown={onMouseDown}
      onTouchMove={onTouchMove}
      style={{
        top,
        left
      }}
    />
  );
};

interface Props {
  addDiff: (diff: number) => void;
  size?: number;
}

const InfiniKnob = ({
  size = 300,
  addDiff,
  children
}: React.PropsWithChildren<Props>) => {
  const [knobContainer, setKnobContainer] = React.useState<HTMLDivElement | null>(
    null
  );

  return (
    <Outer ref={setKnobContainer} className="has-background-primary">
      <Inner addDiff={addDiff} container={knobContainer} size={size} />
      <ChildContainer>{children}</ChildContainer>
    </Outer>
  );
};

const ChildContainer = React.memo(styled.div`
  align-self: center;
  margin: auto;
  z-index: 1;
  pointer-events: none;
`);

export default InfiniKnob;
