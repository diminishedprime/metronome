import React, { useState, useRef, useEffect, useCallback } from "react";
import styled from "styled-components";

const Outer = styled.div`
  margin: auto;
  background-color: #ffd700;
  background-image: radial-gradient(
    circle farthest-corner at 75px 75px,
    #ffd700 0%,
    #bfa100 100%
  );
  position: relative;
  height: 300px;
  width: 300px;
  border-radius: 300px;
  display: flex;
`;

const Inner = styled.div`
  background-color: #bfa100;
  background-image: radial-gradient(
    circle farthest-corner at 75px 75px,
    #bfa100 0%,
    #ffd700 100%
  );
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: absolute;
`;

const Text = styled.div`
  z-index: 1;
  justify-self: center;
  align-self: center;
  text-align: center;
  width: 100%;
  font-size: 5em;
`;

interface Props {
  addDiff: (diff: number) => void;
  size?: number;
}

const InfiniKnob = ({
  size = 300,
  addDiff,
  children
}: Props &
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >) => {
  const [radians, setRadions] = useState((Math.PI * 3) / 2);
  const radiansRef = useRef(Math.PI);
  useEffect(() => {
    radiansRef.current = radians;
  }, [radians]);

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

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setMouseDown(true);
    e.preventDefault();
  };

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
      // Todo - do something with this.
      /* emitDelta(diff) */
      if (diff !== 0) {
        addToBuffer(diff);
      }
      const same = newRadians === radiansRef.current;
      if (!same) {
        setRadions(newRadians);
      }
    },
    [addToBuffer]
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

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const t = e.changedTouches;
    const t0 = t[0];
    moveKnob(t0);
  };

  const top =
    size / 2 +
    Math.sin(radians) * (size / 4) +
    (Math.sin(radians) * size) / 16 -
    size / 6;
  const left =
    size / 2 +
    Math.cos(radians) * (size / 4) +
    (Math.cos(radians) * size) / 16 -
    size / 6;

  return (
    <Outer ref={knobContainer}>
      <Inner
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
`;

export default InfiniKnob;
