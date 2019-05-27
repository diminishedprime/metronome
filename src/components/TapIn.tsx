import React from "react";
import * as R from "ramda";
import { Button } from "./Common";
import * as redux from "../redux";

const calculateBPM = R.pipe(
  (tapTimes: number[]) => R.aperture(2, tapTimes),
  R.map(([a, b]) => b - a),
  R.mean,
  R.divide(60000),
  Math.trunc
);

const TapIn: React.FC = () => {
  const [taps, setTaps] = React.useState<number[]>([]);

  const onTap = () => {
    const now = performance.now();
    const newTaps = R.append(now, taps).filter(tap => now - tap < 3000);
    if (newTaps.length > 1) {
      const bpm = calculateBPM(newTaps);
      redux.setBPM(bpm);
    }
    setTaps(newTaps);
  };

  return (
    <Button isLink isOutlined onClick={onTap}>
      Tap In
    </Button>
  );
};

export default TapIn;
