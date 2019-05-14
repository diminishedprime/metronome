import React, {
  SyntheticEvent,
  useState,
  useEffect,
  useRef,
  TouchEvent,
  Touch
} from "react";
import styled from "styled-components";

/* const totalDiffPath = R.lensPath(["totalDiff"]);
 * const radiansPath = R.lensPath(["radians"]);
 * const mouseDownPath = R.lensPath(["mouse down"]);
 *  */
/* class InfiniKnob extends React.Component {
 *   constructor() {
 *     super();
 *     this.state = R.compose(
 *       R.set(totalDiffPath, 0),
 *       R.set(radiansPath, Math.PI),
 *       R.set(mouseDownPath, false)
 *     )({});
 *     this.addToBuffer = this.addToBuffer.bind(this);
 *     this.onTouchMove = this.onTouchMove.bind(this);
 *     this.onMouseDown = this.onMouseDown.bind(this);
 *     this.moveKnob = this.moveKnob.bind(this);
 *     this.mouseUp = this.mouseUp.bind(this);
 *     this.mouseMove = this.mouseMove.bind(this);
 *   }
 *
 *
 *   moveKnob(e) {
 *     const { clientX, clientY } = e;
 *
 *     const box = this.knobContainer.getBoundingClientRect();
 *     const boxCenter = {
 *       x: box.left + box.width / 2,
 *       y: box.top + box.height / 2
 *     };
 *     const y = -(boxCenter.y - clientY);
 *     const x = -(boxCenter.x - clientX);
 *     const radians = Math.atan2(y, x);
 *     const currentRadians = R.view(radiansPath, this.state);
 *     let diff = currentRadians - radians;
 *     if (diff < -Math.PI) {
 *       diff = -currentRadians - radians;
 *     } else if (diff > Math.PI) {
 *       diff = currentRadians - -radians;
 *     }
 *     this.addToBuffer(diff);
 *     this.setState(R.set(radiansPath, radians));
 *   }
 *
 *   addToBuffer(diff) {
 *     const totalDiff = this.state.totalDiff;
 *     const threshold = this.props.theshold || 0.1;
 *     if (Math.abs(totalDiff) < threshold) {
 *       this.setState(R.over(totalDiffPath, R.add(diff)));
 *     } else {
 *       const emitDelta = this.props.emitDelta;
 *       if (emitDelta) {
 *         const delta = totalDiff > 0 ? -1 : 1;
 *         emitDelta(delta);
 *       } else {
 *         // eslint-disable-next-line no-console
 *         console.log("Don't forget to add an emitDelta prop");
 *       }
 *       this.setState(R.set(totalDiffPath, 0));
 *     }
 *   }
 *
 *   onTouchMove(e) {
 *     const t = e.changedTouches;
 *     const t0 = t[0];
 *     this.moveKnob(t0);
 *   }
 *
 *   render() {
 *     return (
 *       <div style={style}>
 *         <div
 *           style={outerCircleStyle}
 *           ref={me => {
 *             this.knobContainer = me;
 *           }}
 *         >
 *           <div
 *             onMouseDown={this.onMouseDown}
 *             onTouchMove={this.onTouchMove}
 *             style={InnerCircleStyle}
 *           />
 *           <div style={lilNubStyle(Math.PI)} />
 *           <div style={lilNubStyle(Math.PI * (1 / 2))} />
 *           <div style={lilNubStyle(Math.PI * (1 / 4))} />
 *           <div style={lilNubStyle(Math.PI * (3 / 4))} />
 *           <div style={lilNubStyle(Math.PI * -(1 / 2))} />
 *           <div style={lilNubStyle(Math.PI * -(1 / 4))} />
 *           <div style={lilNubStyle(Math.PI * -(3 / 4))} />
 *         </div>
 *       </div>
 *     );
 *   }
 * } */

interface Props {
  value: number;
  setValue: (value: number) => void;
}

const Dial = styled(({ value, setValue, ...props }: Props) => {
  const [mouseDown, setMouseDown] = useState(false);
  const [radians, setRadians] = useState(0);

  const knobContainer = useRef<HTMLDivElement>(null);

  const onMouseDown = (e: SyntheticEvent) => {
    console.log("hi mouse down");
    setMouseDown(true);
    e.preventDefault();
  };

  const onTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    const t = e.changedTouches;
    const t0 = t[0];
    moveKnob(t0);
  };

  /* *   onTouchMove(e) {
   *     *     const t = e.changedTouches;
   *     *     const t0 = t[0];
   *     *     this.moveKnob(t0);
   *     *   } */

  const mouseUp = (e: MouseEvent) => {
    console.log("hi mouse up");
    setMouseDown(false);
    e.preventDefault();
  };

  const moveKnob = (e: Touch) => {
    const { clientX, clientY } = e;
    if (knobContainer.current) {
      const box = knobContainer.current.getBoundingClientRect();
      const boxCenter = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2
      };
      const y = -(boxCenter.y - clientY);
      const x = -(boxCenter.x - clientX);
      const newRadians = Math.atan2(y, x);
      let diff = radians - newRadians;
      if (diff < -Math.PI) {
        diff = -radians - newRadians;
      } else {
        diff = radians - -newRadians;
      }
      addToBuffer(diff);
      setRadians(newRadians);
    }
  };

  const addToBuffer = (diff: number) => {
    setValue(value + diff);
  };

  const mouseMove = (e: MouseEvent) => {
    if (mouseDown) {
      /* moveKnob(e); */
    }
  };

  /* *   addToBuffer(diff) {
   *     *     const totalDiff = this.state.totalDiff;
   *     *     const threshold = this.props.theshold || 0.1;
   *     *     if (Math.abs(totalDiff) < threshold) {
   *         *       this.setState(R.over(totalDiffPath, R.add(diff)));
   *         *     } else {
   *             *       const emitDelta = this.props.emitDelta;
   *             *       if (emitDelta) {
   *                 *         const delta = totalDiff > 0 ? -1 : 1;
   *                 *         emitDelta(delta);
   *                 *       } else {
   *                     *         // eslint-disable-next-line no-console
   *                     *         console.log("Don't forget to add an emitDelta prop");
   *                     *       }
   *             *       this.setState(R.set(totalDiffPath, 0));
   *             *     }
   *     *   }
   */

  useEffect(() => {
    console.log("mouse up evvect");
    window.addEventListener("mouseup", mouseUp);
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mouseup", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  return (
    <div ref={knobContainer} {...props}>
      <InnerCircle onMouseDown={onMouseDown} onTouchMove={onTouchMove} />
    </div>
  );
})`
  width: 100px;
  height: 100px;
  background-color: #c0ffee;
  border-radius: 100%;
`;

const InnerCircle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 100%;
  background-color: green;
`;

export default Dial;
