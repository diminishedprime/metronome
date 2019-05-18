import React, { useEffect, useState } from "react";
import { useLocalStorage } from "./hooks";
import * as R from "ramda";
import styled from "styled-components";
import { Button } from "./Common";

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

const Scales = ({ startMetronome, stopMetronome, ...props }: Props) => {
  // instead of saving the array, we should store them keyed by a unique
  // identifier so we can have the scales go in any order.
  const [scales, setScales] = useLocalStorage(
    "@mjh/metronome/scales",
    initialScales
  );
  const [scaleIndex, setScaleIndex] = useState<number | undefined>(0);
  const scale = scales[scaleIndex!];
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
      /* startMetronome(scale.bpm); */
    } else {
      stopMetronome();
    }
    // TODO(mjhamrick) - figure out if there's a clean way to remove the lint
    // error for not including start & stop metronome in the dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scale]);

  let nextScaleText = `Start Scales`;
  if (scaleIndex !== undefined && scaleIndex < scales.length - 1) {
    const { mode, key } = scales[scaleIndex + 1];
    nextScaleText = `Continue (${key} ${mode})`;
  }
  return (
    <div {...props} className="box">
      {scale && (
        <div className="columns is-mobile">
          <CenterVertical className="column is-size-3">
            {scale.key} {scale.mode}
          </CenterVertical>
          <CenterVertical className="column is-size-5 has-text-right">
            BPM: {scale.bpm}
          </CenterVertical>
        </div>
      )}
      <div className="buttons has-addons is-right">
        {scaleIndex !== undefined && (
          <>
            <Button classes={["is-danger"]} onClick={reset}>
              Stop
            </Button>
            <Button style={{ flexGrow: 1 }} onClick={() => addBpm(-1)}>
              -
            </Button>
            <Button style={{ flexGrow: 1 }} onClick={() => addBpm(1)}>
              +
            </Button>
          </>
        )}
        <Button classes={["is-right"]} onClick={nextScale}>
          {nextScaleText}
        </Button>
      </div>
    </div>
  );
};

const CenterVertical = styled.div`
  align-self: center;
`;

export default Scales;
