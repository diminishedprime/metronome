import React from "react";
import * as R from "ramda";
import styled from "styled-components";
import * as Common from "./Common";
import * as hooks from "../hooks";
import * as t from "../types";
import * as immutable from "immutable";
import * as redux from "../redux";

interface DivisionsProps {
  uiEnabledDivisions: t.EnabledDivisions;
  toggleDivisionOption: (option: t.Division) => void;
  clearDivisions: () => void;
}

const DivisionsWrapper = React.memo(styled.section`
  display: flex;
  align-items: baseline;
  > button {
    margin-right: 5px;
  }
  > div {
    margin-right: 5px;
  }
`);

const Divisions: React.FC<DivisionsProps> = React.memo(
  ({ uiEnabledDivisions, toggleDivisionOption, clearDivisions }) => {
    // TODO: I could write typed helpers for trying to navigate down the
    // a.activeBeats.
    const accentOne = redux.useSelector(
      a =>
        (a.activeBeats.getIn(
          // This should really always work since there should always beat a 1 division, and at least 1 beat.
          [0, 1, 0],
          t.defaultDivisionDetails
        ) as t.DivisionDetails).isAccented
    );
    const [firstBeat, setFirstBeat] = React.useState(accentOne);

    // Keep the activeDivision state & this button in sync.
    React.useEffect(() => {
      if (accentOne !== firstBeat) {
        setFirstBeat(accentOne);
      }
    }, [accentOne, firstBeat]);
    React.useEffect(() => {
      redux.setAccent(0, 1, 0, firstBeat);
    }, [firstBeat]);

    return (
      <DivisionsWrapper>
        <div className="is-size-5">Division</div>
        <Common.ToggleButton
          isLink
          on={firstBeat}
          onClick={() => setFirstBeat(a => !a)}
        >
          {">"}
        </Common.ToggleButton>
        <Common.Buttons hasAddons grow style={{ marginRight: "5px" }}>
          {([2, 3, 4, 5, 6] as t.Division[]).map((num: t.Division) => {
            const on = uiEnabledDivisions.get(num)!;
            return (
              <Common.ToggleButton
                grow
                on={on}
                isPrimary
                key={`division-options-${num}`}
                onClick={() => toggleDivisionOption(num)}
              >
                {num}
              </Common.ToggleButton>
            );
          })}
        </Common.Buttons>
        <Common.Button grow isDanger isOutlined onClick={clearDivisions}>
          Clear
        </Common.Button>
      </DivisionsWrapper>
    );
  }
);

// TODO: the logic for the time signature is way too complicated. I should update this to be simplier.
// TODO: When changing the time signature, if we're adding, we should keep
// existing accents, and use the same divisions as currently enabled in the UI.
// TODO: When changing the time signature, if we're removing, we should just
// remove from the end of the list.
const TimeSignature = () => {
  const setSignature = redux.setSignature;
  const numerator = redux.useSelector(
    a => a.metronomeState.signature.numerator
  );

  const [hasChanged, setHasChanged] = React.useState(false);
  const [uIenabledDivisions, setUiEnabledDivisions] = hooks.useLocalStorage<
    t.EnabledDivisions
  >(
    t.LocalStorageKey.EnabledDivisions,
    immutable.Map<t.Division, boolean>().set(1, true)
  );

  React.useEffect(() => {
    if (hasChanged) {
      setSignature(old => ({
        ...old,
        numerator: immutable.List(
          R.range(0, old.numerator.size).map(() => uIenabledDivisions)
        )
      }));
    }
  }, [uIenabledDivisions, hasChanged, setSignature]);

  const toggleDivisionOption = React.useCallback(
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

  const clearDivisions = React.useCallback(() => {
    setUiEnabledDivisions(immutable.Map<t.Division, boolean>().set(1, true));
  }, [setUiEnabledDivisions]);

  // TODO: - make it where clicking on a division group lets you set the volume & accents for that group.
  // TODO: - add an option to turn on or off the accent at the start of every measure.
  // TODO: - clean up these buttons to not use className.

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
            <Common.ToggleButton
              key={`numerator-button-${num}`}
              on={on}
              isPrimary
              isOutlined
              grow
              onClick={on ? () => {} : () => setCurrentNumerator(num)}
            >
              <>{num}/4</>
            </Common.ToggleButton>
          );
        })}
      </section>
    );
  }
);

const BeatRowItemWrapper = React.memo(styled.div`
  width: 1px;
  margin-left: 1px;
  margin-right: 1px;
  flex-grow: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
`);

const BeatRowWrapper = React.memo(styled.div`
  display: flex;
  flex-grow: 1;
`);

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

// TODO: - the selected division values should reset when you stop the metronome.
// TODO: - If not playing, this should show the boring gray background.
// TODO: - Resetting the beats should not reset the chosen accents.
const BeatRowItem: React.FC<{
  beatIndex: number;
  division: t.Division;
  divisionIndex: number;
  height: number;
}> = React.memo(({ height, beatIndex, division, divisionIndex }) => {
  const details = redux.useSelector(
    a =>
      a.activeBeats
        .get(beatIndex)!
        .get(division)!
        .get(divisionIndex)!
  );
  const className = React.useMemo(() => {
    return details.isActive ? "has-background-link" : "has-background-primary";
  }, [details.isActive]);
  return (
    <BeatRowItemWrapper
      className={className}
      onClick={() => redux.toggleAccent(beatIndex, division, divisionIndex)}
      style={{
        height,
        marginTop: 1
      }}
    >
      <div>{details.isAccented && ">"}</div>
    </BeatRowItemWrapper>
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

// TODO: - make it where you can click and drag on the visual subdivision to
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
