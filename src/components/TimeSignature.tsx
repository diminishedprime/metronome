import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { Button, Buttons, ToggleButton } from "./Common";
import * as t from "../types";
import * as immutable from "immutable";

interface Props {
  metronome: t.Metronome;
}

const Divisions = styled.section`
  display: flex;
  align-items: baseline;
  > div {
    margin-right: 10px;
  }
`;

const TimeSignature = ({ metronome }: Props) => {
  const setSignature = React.useMemo(() => metronome.setSignature, [
    metronome.setSignature
  ]);
  const activeBeats = React.useMemo(() => metronome.state.activeDivisions, [
    metronome.state.activeDivisions
  ]);
  const numerator = React.useMemo(() => metronome.state.signature.numerator, [
    metronome.state.signature.numerator
  ]);

  const [hasChanged, setHasChanged] = useState(false);
  const [uIenabledDivisions, setUiEnabledDivisions] = useState<
    t.EnabledDivisions
  >(immutable.Map<t.Division, boolean>().set(1, true));
  const setNumerator = useCallback(
    (numerator: number) => {
      setHasChanged(true);
      setSignature(old => ({
        ...old,
        numerator: immutable.List(
          R.range(0, numerator).map(() => uIenabledDivisions)
        )
      }));
    },
    [uIenabledDivisions, setSignature]
  );

  useEffect(() => {
    if (hasChanged) {
      setSignature(old => ({
        ...old,
        numerator: immutable.List(
          R.range(0, old.numerator.size).map(() => uIenabledDivisions)
        )
      }));
    }
  }, [uIenabledDivisions, hasChanged, setSignature]);

  const toggleDivisionOption = useCallback(
    (divisionOption: t.Division) => {
      setHasChanged(true);
      setUiEnabledDivisions(old => {
        const oldValue = old.get(divisionOption);
        const newValue = oldValue === undefined ? true : !oldValue;
        return old.set(divisionOption, newValue);
      });
    },
    [setUiEnabledDivisions]
  );

  const clearDivisions = useCallback(() => {
    setUiEnabledDivisions(immutable.Map<t.Division, boolean>().set(1, true));
  }, [setUiEnabledDivisions]);

  // TODO - make it where clicking on a division group lets you set the volume & accents for that group.
  // TODO - add an option to turn on or off the accent at the start of every measure.
  // TODO - clean up these buttons to not use className.
  return (
    <>
      <section style={{ marginTop: "10px" }} className="section is-centered" />
      <Divisions>
        <div className="is-size-5">Division</div>
        <Buttons hasAddons grow style={{ marginRight: "5px" }}>
          {([2, 3, 4, 5, 6] as t.Division[]).map((num: t.Division) => {
            const on = uIenabledDivisions.get(num)!;
            return (
              <ToggleButton
                grow
                on={on}
                isPrimary
                key={`division-options-${num}`}
                onClick={() => toggleDivisionOption(num)}
              >
                {num}
              </ToggleButton>
            );
          })}
        </Buttons>
        <Button grow isDanger isOutlined onClick={clearDivisions}>
          Clear
        </Button>
      </Divisions>
      <Beats activeBeats={activeBeats} />

      <section className="section buttons is-centered">
        {[1, 2, 3, 4, 5].map(num => {
          const on = numerator.size === num;
          return (
            <ToggleButton
              key={`numerator-button-${num}`}
              on={on}
              isPrimary
              isOutlined
              grow
              onClick={on ? () => {} : () => setNumerator(num)}
            >
              <>{num}/4</>
            </ToggleButton>
          );
        })}
      </section>
    </>
  );
};

// TODO - margin should be calculated based on number of divisions.
const BeatRowItemWrapper = styled.div`
  width: 1px;
  margin-left: 1px;
  margin-right: 1px;
  flex-grow: 1;
`;

// TODO - margin should be calculated based on number of beats.
const BeatRowWrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

// TODO - margin should be calculated based on number of beats.
const BeatWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`;

const BeatsWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 10px;
`;

// TODO - the selected division values should reset when you stop the metronome.
// TODO - If not playing, this should show the boring gray background.
const BeatRowItem: React.FC<{
  on: boolean;
  beatRows: number;
}> = ({ on, beatRows }) => {
  const className = React.useMemo(() => {
    return on ? "has-background-primary" : "has-background-link";
  }, [on]);
  const height = React.useMemo(() => {
    return 70 / beatRows;
  }, [beatRows]);
  return (
    <BeatRowItemWrapper
      className={className}
      style={{
        height,
        marginTop: 1
      }}
    />
  );
};

const BeatRow: React.FC<{
  bools: immutable.List<boolean>;
  divisions: t.Division;
  beatNumber: number;
  beatRows: number;
  rowIndex: number;
}> = ({ bools, beatNumber, rowIndex, beatRows }) => {
  const j = rowIndex;
  const index = beatNumber;
  return (
    <BeatRowWrapper key={`${index}-${j}`}>
      {bools.map((on, itemIndex) => (
        <BeatRowItem
          beatRows={beatRows}
          key={`${index}-${rowIndex}-${itemIndex}`}
          on={on}
        />
      ))}
    </BeatRowWrapper>
  );
};

const Beat: React.FC<{
  beat: immutable.Map<t.Division, immutable.List<boolean>>;
  index: number;
}> = ({ beat, index }) => {
  const things = beat.entrySeq();
  return (
    <BeatWrapper key={`${index}`}>
      {things.map(([divisions, bools], rowIndex) => (
        <BeatRow
          beatRows={things.size || 0}
          key={`${index}-${rowIndex}`}
          divisions={divisions}
          bools={bools}
          beatNumber={index}
          rowIndex={rowIndex}
        />
      ))}
    </BeatWrapper>
  );
};

const Beats: React.FC<{
  activeBeats: t.ActiveDivisonss;
}> = ({ activeBeats }) => {
  return (
    <BeatsWrapper>
      {activeBeats.map((beat, beatNumber) => (
        <Beat key={beatNumber} beat={beat} index={beatNumber} />
      ))}
    </BeatsWrapper>
  );
};

export default TimeSignature;
