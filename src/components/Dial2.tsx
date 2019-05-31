import React from "react";
import styled from "styled-components";

const InnerCircle = styled.div`
  border-radius: 100%;
  position: absolute;
`;

const OuterCircle = styled.div`
  border-radius: 100%;
  position: relative;
`;

const DialWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface DialProps {}

const Dial: React.FC<DialProps> = () => {
  const [isLocked, setIsLocked] = React.useState(false);
  const [innerCircle, setInnerCircle] = React.useState<HTMLDivElement | null>(
    null
  );
  const [outerCircle, setOuterCircle] = React.useState<HTMLDivElement | null>(
    null
  );
  const [outerSize, setOuterSize] = React.useState(72);
  const [innerSize, setInnerSize] = React.useState(70);
  const [innerTop, setInnerTop] = React.useState(0);
  const [innerLeft, setInnerLeft] = React.useState(2);
  const [thing, setThing] = React.useState<any>();
  const [lastMove, setLastMove] = React.useState<
    React.Touch | React.MouseEvent | MouseEvent
  >();

  React.useLayoutEffect(() => {
    if (!isLocked) {
      if (lastMove !== undefined) {
        const newSize = Math.min(200, lastMove.clientY);
        setOuterSize(newSize);
        if (newSize === 200) {
          setIsLocked(true);
        }
      }
      if (innerCircle !== null && outerCircle !== null) {
        const outerBoundingRect = outerCircle.getBoundingClientRect();
        const innerBoundingRect = innerCircle.getBoundingClientRect();

        const outerheight = outerBoundingRect.height;
        const innerHeight = innerBoundingRect.height;
        setInnerTop(outerheight - innerHeight);

        const outerwidth = outerBoundingRect.width;
        const innerWidth = innerBoundingRect.width;
        setInnerLeft(outerwidth / 2 - innerWidth / 2);
      }
    }
  });

  const moveKnob = React.useCallback(
    (e: React.Touch | React.MouseEvent | MouseEvent) => {
      if (innerCircle !== null && outerCircle !== null) {
        setLastMove(e);
      }
    },
    [innerCircle, outerCircle]
  );

  const onTouchMove = React.useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const t = e.changedTouches;
      const t0 = t[0];
      moveKnob(t0);
    },
    [moveKnob]
  );

  return (
    <DialWrapper>
      <OuterCircle
        ref={setOuterCircle}
        className="has-background-link"
        style={{ width: outerSize, height: outerSize }}
      >
        <InnerCircle
          ref={setInnerCircle}
          style={{
            top: innerTop,
            left: innerLeft,
            width: innerSize,
            height: innerSize
          }}
          className="has-background-primary"
          onTouchMove={onTouchMove}
        />
      </OuterCircle>
      <div>{JSON.stringify(thing)}</div>
    </DialWrapper>
  );
};

export default Dial;
