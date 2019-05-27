import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { Button, Buttons, ToggleButton } from "./Common";
import * as hooks from "../hooks";
import * as t from "../types";
import * as immutable from "immutable";
import * as redux from "../redux";

interface Props {
  metronome: t.Metronome;
}

interface DivisionsProps {
  uiEnabledDivisions: t.EnabledDivisions;
  toggleDivisionOption: (option: t.Division) => void;
  clearDivisions: () => void;
}

const DivisionsWrapper = React.memo(styled.section`
  display: flex;
  align-items: baseline;
  > div {
    margin-right: 10px;
  }
`);

const Divisions: React.FC<DivisionsProps> = React.memo(
  ({ uiEnabledDivisions, toggleDivisionOption, clearDivisions }) => {
    return (
      <DivisionsWrapper>
        <div className="is-size-5">Division</div>
        <Buttons hasAddons grow style={{ marginRight: "5px" }}>
          {([2, 3, 4, 5, 6] as t.Division[]).map((num: t.Division) => {
            const on = uiEnabledDivisions.get(num)!;
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
      </DivisionsWrapper>
    );
  }
);

const TimeSignature = () => {
  const setSignature = redux.setSignature;
  const numerator = redux.useSelector(
    a => a.metronomeState.signature.numerator
  );

  const [hasChanged, setHasChanged] = useState(false);
  const [uIenabledDivisions, setUiEnabledDivisions] = hooks.useLocalStorage<
    t.EnabledDivisions
  >(
    t.LocalStorageKey.EnabledDivisions,
    immutable.Map<t.Division, boolean>().set(1, true)
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

  const [currentNumerator, setCurrentNumerator] = React.useState(
    numerator.size
  );

  React.useEffect(() => {
    setSignature(old => ({
      ...old,
      numerator: immutable.List(
        R.range(0, currentNumerator).map(() => uIenabledDivisions)
      )
    }));
  }, [currentNumerator, setSignature, uIenabledDivisions]);

  return (
    <>
      <Beats />
      <Divisions
        uiEnabledDivisions={uIenabledDivisions}
        toggleDivisionOption={toggleDivisionOption}
        clearDivisions={clearDivisions}
      />
      <Signature
        currentNumerator={numerator.size}
        setCurrentNumerator={setCurrentNumerator}
      />
    </>
  );
};

interface SignatureProps {
  setCurrentNumerator: (numerator: number) => void;
  currentNumerator: number;
}

const Signature: React.FC<SignatureProps> = React.memo(
  ({ setCurrentNumerator, currentNumerator }) => {
    return (
      <section className="section buttons is-centered">
        {[1, 2, 3, 4, 5].map(num => {
          const on = currentNumerator === num;
          return (
            <ToggleButton
              key={`numerator-button-${num}`}
              on={on}
              isPrimary
              isOutlined
              grow
              onClick={on ? () => {} : () => setCurrentNumerator(num)}
            >
              <>{num}/4</>
            </ToggleButton>
          );
        })}
      </section>
    );
  }
);

// TODO - margin should be calculated based on number of divisions.
const BeatRowItemWrapper = React.memo(styled.div`
  width: 1px;
  margin-left: 1px;
  margin-right: 1px;
  flex-grow: 1;
`);

// TODO - margin should be calculated based on number of beats.
const BeatRowWrapper = React.memo(styled.div`
  display: flex;
  flex-grow: 1;
`);

// TODO - margin should be calculated based on number of beats.
const BeatWrapper = React.memo(styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
`);

const BeatsWrapper = React.memo(styled.div`
  display: flex;
  flex-grow: 1;
  margin-bottom: 10px;
`);

// TODO - the selected division values should reset when you stop the metronome.
// TODO - If not playing, this should show the boring gray background.
const BeatRowItem: React.FC<{
  beatIndex: number;
  division: t.Division;
  divisionIndex: number;
  height: number;
}> = React.memo(({ height, beatIndex, division, divisionIndex }) => {
  const on = redux.useSelector(
    a =>
      a.activeBeats
        .get(beatIndex)!
        .get(division)!
        .get(divisionIndex)!
  );
  const className = React.useMemo(() => {
    return on ? "has-background-primary" : "has-background-link";
  }, [on]);
  return (
    <BeatRowItemWrapper
      className={className}
      style={{
        height,
        marginTop: 1
      }}
    />
  );
});

const BeatRow: React.FC<{
  beatIndex: number;
  division: t.Division;
  height: number;
}> = React.memo(({ height, beatIndex, division }) => {
  return (
    <BeatRowWrapper>
      {R.range(0, division).map(divisionIndex => (
        <BeatRowItem
          key={`${beatIndex}-${division}-${divisionIndex}`}
          height={height}
          beatIndex={beatIndex}
          division={division}
          divisionIndex={divisionIndex}
        />
      ))}
    </BeatRowWrapper>
  );
});

const Beat: React.FC<{
  beatIndex: number;
}> = React.memo(({ beatIndex }) => {
  const divisions = redux.useSelector(
    a => a.activeBeats.get(beatIndex)!.keySeq(),
    (a, b) => a.equals(b)
  );
  return (
    <BeatWrapper key={`${beatIndex}`}>
      {divisions.map(division => (
        <BeatRow
          height={70 / divisions.size!}
          key={`${beatIndex}-${division}`}
          beatIndex={beatIndex}
          division={division}
        />
      ))}
    </BeatWrapper>
  );
});

// TODO - make it where you can click and drag on the visual subdivision to
// change the volume and double tap to change it's color and also make it an
// accent?
const Beats: React.FC = React.memo(() => {
  const activeBeats = redux.useSelector(a => a.activeBeats.size);
  return (
    <BeatsWrapper>
      {R.range(0, activeBeats).map(beatIndex => (
        <Beat key={beatIndex} beatIndex={beatIndex} />
      ))}
    </BeatsWrapper>
  );
});

export default TimeSignature;
