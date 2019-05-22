import React, { useState, useCallback, useEffect } from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useToggle, useLocalStorage } from "./hooks";
import { Button, GrowButton } from "./Common";
import * as t from "./types";

interface Props {
  signature: t.Signature;
  setSignature: React.Dispatch<React.SetStateAction<t.Signature>>;
  playing: boolean;
  activeSubDivisions: t.Divisions;
}

const SigColumn = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SigColumns = styled.div`
  display: flex;
  height: 20px;
`;

const TimeSignature = ({
  playing,
  signature: { beats },
  setSignature,
  activeSubDivisions
}: Props) => {
  const [edit, toggleEdit] = useToggle(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [divisions, setDivisions] = useLocalStorage<t.DivisionOptions[]>(
    "@mjh/time-signature",
    [1]
  );
  const setNumerator = useCallback(
    (numerator: number) => {
      setHasChanged(true);
      setSignature(old => ({
        ...old,
        beats: R.range(0, numerator).map(() => ({ divisions }))
      }));
    },
    [divisions]
  );

  const classesForDivisions = useCallback(
    (division: t.DivisionOptions) => {
      if (divisions.indexOf(division) === -1) {
        return [""];
      } else {
        return ["is-primary"];
      }
    },
    [divisions]
  );

  useEffect(() => {
    if (hasChanged) {
      setSignature(old => ({
        ...old,
        beats: R.range(0, old.beats.length).map(() => ({ divisions }))
      }));
    }
  }, [divisions, hasChanged]);

  const toggleDivisionOption = (divisionOption: t.DivisionOptions) => {
    setHasChanged(true);
    setDivisions(old => {
      if (old.indexOf(divisionOption) !== -1) {
        return old.filter(a => a !== divisionOption);
      } else {
        return old.concat([divisionOption]).sort();
      }
    });
  };

  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className="section buttons is-centered"
      >
        {([2, 3, 4, 5, 6] as t.DivisionOptions[]).map(
          (num: t.DivisionOptions) => (
            <GrowButton
              key={`division-options-${num}`}
              classes={classesForDivisions(num)}
              onClick={() => toggleDivisionOption(num)}
            >
              {num}
            </GrowButton>
          )
        )}
      </section>
      <section className="section is-mobile columns" onClick={toggleEdit}>
        {activeSubDivisions.map((subDivisions, beat) => {
          return (
            <div className={`column has-text-centered`} key={beat}>
              {subDivisions.map(({ divisions, current }, beatIdx) => {
                return (
                  <SigColumns
                    key={`d${divisions}`}
                    className="has-background-light"
                  >
                    {R.range(0, divisions).map((d, idx) => {
                      const bg =
                        current === idx && playing
                          ? "has-background-primary"
                          : "";
                      return (
                        <SigColumn
                          key={`d${divisions}-${idx}`}
                          className={`${bg} has-text-centered`}
                          style={{ justifyContent: "center" }}
                        >
                          {beatIdx === 0 && beat + 1}
                        </SigColumn>
                      );
                    })}
                  </SigColumns>
                );
              })}
            </div>
          );
        })}
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
