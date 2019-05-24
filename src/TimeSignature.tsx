import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useToggle, useLocalStorage } from "./hooks";
import { Button, GrowButton } from "./Common";
import * as t from "./types";

interface Props {
  signature: t.TimeSignature;
  setSignature: React.Dispatch<React.SetStateAction<t.TimeSignature>>;
  playing: boolean;
  activeBeats: t.ActiveDivisions[];
}

const SigColumn = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SigColumns = styled.div`
  display: flex;
`;

const BeatColumnRow = ({
  playing,
  activeBeats,
  beatIdx,
  division,
  divisionIdx,
  enabledDivisions: beatDivisions
}: {
  division: string;
  playing: boolean;
  activeBeats: t.ActiveDivisions[];
  divisionIdx: number;
  beatIdx: number;
  enabledDivisions: t.EnabledDivisions;
}) => {
  const divisions = parseInt(division, 10);
  return (
    <SigColumns key={`d${divisions}`}>
      {R.range(0, divisions).map(idx => {
        const bg =
          playing &&
          activeBeats[beatIdx] &&
          activeBeats[beatIdx][divisions] === idx
            ? "has-background-primary"
            : "has-background-light";
        const marginTop = divisions === 1 ? 0 : 5;
        const marginLeft = idx === 0 ? 0 : 10 / divisions;
        const marginRight = idx === divisions - 1 ? 0 : 10 / divisions;
        return (
          <SigColumn
            key={`d${divisions}-${idx}`}
            className={`${bg} has-text-centered`}
            style={{
              justifyContent: "center",
              height:
                70 /
                  Object.keys(beatDivisions).filter(
                    key => beatDivisions[key as any]
                  ).length -
                marginTop,
              marginLeft,
              marginRight,
              marginTop
            }}
          >
            {divisionIdx === 0 && beatIdx + 1}
          </SigColumn>
        );
      })}
    </SigColumns>
  );
};

const BeatColumn = (props: {
  playing: boolean;
  activeBeats: t.ActiveDivisions[];
  beatIdx: number;
  enabledDivisions: t.EnabledDivisions;
}) => {
  return (
    <div className={`column has-text-centered`}>
      {Object.keys(props.enabledDivisions)
        .filter(key => props.enabledDivisions[key as any])
        .map((division, divisionIdx) => (
          <BeatColumnRow
            key={`${props.beatIdx}-${divisionIdx}`}
            {...{ ...props, division, divisionIdx }}
          />
        ))}
    </div>
  );
};

const TimeSignature = ({
  playing,
  signature: { numerator },
  setSignature,
  activeBeats
}: Props) => {
  const [edit, toggleEdit] = useToggle(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [uIenabledDivisions, setUiEnabledDivisions] = useLocalStorage<
    t.EnabledDivisions
  >(t.LocalStorageKey.SignatureDivisions, { 1: true });
  const setNumerator = useCallback(
    (numerator: number) => {
      setHasChanged(true);
      setSignature(old => {
        return R.assoc(
          "numerator",
          R.range(0, numerator).map(() => uIenabledDivisions),
          old
        );
      });
    },
    [uIenabledDivisions, setSignature]
  );

  const classesForDivisions = useCallback(
    (division: t.Division) =>
      uIenabledDivisions[division] ? "is-primary" : "",
    [uIenabledDivisions]
  );
  useEffect(() => {
    if (hasChanged) {
      setSignature(old => ({
        ...old,
        numerator: R.range(0, old.numerator.length).map(
          () => uIenabledDivisions
        )
      }));
    }
  }, [uIenabledDivisions, hasChanged, setSignature]);

  const toggleDivisionOption = useCallback(
    (divisionOption: t.Division) => {
      setHasChanged(true);
      setUiEnabledDivisions(old =>
        R.over(R.lensPath([divisionOption]), R.not, old)
      );
    },
    [setUiEnabledDivisions]
  );

  const clearDivisions = useCallback(() => {
    setUiEnabledDivisions({ 1: true });
  }, [setUiEnabledDivisions]);

  return (
    <>
      <h3
        className="subtitle is-5"
        style={{ paddingLeft: "10px", marginBottom: "0" }}
      >
        Divisions
      </h3>
      <section
        style={{ marginTop: "10px" }}
        className="section buttons is-centered"
      >
        {([2, 3, 4, 5, 6] as t.Division[]).map((num: t.Division) => (
          <GrowButton
            key={`division-options-${num}`}
            className={classesForDivisions(num)}
            onClick={() => toggleDivisionOption(num)}
          >
            {num}
          </GrowButton>
        ))}
        <GrowButton
          className={"is-danger is-outlined"}
          onClick={clearDivisions}
        >
          Clear
        </GrowButton>
      </section>
      <section className="section is-mobile columns" onClick={toggleEdit}>
        {numerator.map(
          (enabledDivisions: t.EnabledDivisions, beatIdx: number) => (
            <BeatColumn
              key={`${beatIdx}-enabledDivisionColumn`}
              {...{ playing, beatIdx, enabledDivisions, activeBeats }}
            />
          )
        )}
      </section>
      {edit && (
        <section className="section buttons is-centered">
          <Button onClick={() => setNumerator(2)}>2/4</Button>
          <Button onClick={() => setNumerator(3)}>3/4</Button>
          <Button onClick={() => setNumerator(4)}>4/4</Button>
          <Button onClick={() => setNumerator(5)}>5/4</Button>
        </section>
      )}
    </>
  );
};

export default TimeSignature;
