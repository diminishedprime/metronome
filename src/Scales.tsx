import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { useLocalStorage } from "./hooks";
import * as R from "ramda";
import styled from "styled-components";

enum Mode {
  MAJOR = "Major"
}

interface Scale {
  key: string;
  mode: Mode;
  know: boolean;
  bpm: number;
}

interface Props {
  startMetronome: (bpm: number) => void;
  stopMetronome: () => void;
}

const toggleKnownP = (idx: number) => R.lensPath([idx, "know"]);
const bpmP = (idx: number) => R.lensPath([idx, "bpm"]);

const initialScales: Scale[] = [
  { key: "A", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "Bb", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "B", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "C", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "Db", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "D", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "Eb", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "E", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "F", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "Gb", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "G", mode: Mode.MAJOR, know: false, bpm: 80 },
  { key: "Ab", mode: Mode.MAJOR, know: false, bpm: 80 }
];

const Scales = styled(({ startMetronome, stopMetronome, ...props }: Props) => {
  // instead of saving the array, we should store them keyed by a unique
  // identifier so we can have the scales go in any order.
  const [scales, setScales] = useLocalStorage(
    "@mjh/metronome/scales",
    initialScales
  );
  const [scaleIndex, setScaleIndex] = useState<number>();
  const scale = scales[scaleIndex!];
  const toggleKnown = () => setScales(R.over(toggleKnownP(scaleIndex!), R.not));
  const addBpm = (diff: number) =>
    setScales(R.over(bpmP(scaleIndex!), R.add(diff)));
  const reset = () => setScaleIndex(undefined);
  const nextScale = () => {
    setScaleIndex((oldIdx: number | undefined) => {
      if (oldIdx === undefined) {
        return 0;
      }
      let nextIndex = oldIdx + 1;
      if (nextIndex >= scales.length) {
        return undefined;
      }
      return nextIndex;
    });
  };
  useEffect(() => {
    if (scale) {
      startMetronome(scale.bpm);
    } else {
      stopMetronome();
    }
    // TODO(mjhamrick) - figure out if there's a clean way to remove the lint
    // error for not including start & stop metronome in the dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);
  return (
    <div {...props} className='box'>
      {scale && (
        <Scale>
          <Column>
            <Body>
              {scale.key} {scale.mode}
            </Body>
            <Subtitle>Key</Subtitle>
          </Column>
          <Column>
            <Body>{scale.bpm}</Body>
            <Subtitle>BPM</Subtitle>
            <div className='buttons has-addons'>
              <a className='button' onClick={() => addBpm(-1)}>-</a>
              <a className='button' onClick={() => addBpm(1)}>+</a>
            </div>
          </Column>
          <Column onClick={toggleKnown}>
            <Body>{"" + scale.know}</Body>
            <Subtitle>Know</Subtitle>
          </Column>
        </Scale>
      )}
      <div className='buttons has-addons'>
      <a className='button' onClick={nextScale}>Next Scale</a>
      {scaleIndex !== undefined && <a className='button is-danger' onClick={reset}>Stop Scales</a>}
</div>
    </div>
  );
})``;

const Scale = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Subtitle = styled.div`
  font-size: 1em;
`;

const Body = styled.div`
  font-weight: bold;
  font-size: 3em;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export default Scales;
