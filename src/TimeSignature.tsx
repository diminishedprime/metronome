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
  activeBeats: t.ActiveBeat[];
}

const SigColumn = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SigColumns = styled.div`
  display: flex;
`;

const TimeSignature = ({
  playing,
  signature: { beats },
  setSignature,
  activeBeats
}: Props) => {
  const [edit, toggleEdit] = useToggle(false);
  const [hasChanged, setHasChanged] = useState(false);
  const [divisions, setDivisions] = useLocalStorage<t.Division[]>(
    t.LocalStorageKey.SignatureDivisions,
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
    [divisions, setSignature]
  );

  const classesForDivisions = useCallback(
    (division: t.Division) => {
      if (divisions.indexOf(division) === -1) {
        return "";
      } else {
        return "is-primary";
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
  }, [divisions, hasChanged, setSignature]);

  const toggleDivisionOption = useCallback(
    (divisionOption: t.Division) => {
      setHasChanged(true);
      setDivisions(old => {
        if (old.indexOf(divisionOption) !== -1) {
          return old.filter(a => a !== divisionOption);
        } else {
          return old.concat([divisionOption]).sort();
        }
      });
    },
    [setDivisions]
  );

  const clearDivisions = useCallback(() => {
    setDivisions([1]);
  }, [setDivisions]);

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
        {activeBeats.map((activeBeat: t.ActiveBeat, beat) => {
          const activeBeatKeys = Object.keys(activeBeat);
          return (
            <div className={`column has-text-centered`} key={beat}>
              {activeBeatKeys.map((divisionOption, beatIdx) => {
                const divisions = parseInt(divisionOption, 10);
                const thing = activeBeat[divisions];
                return (
                  <SigColumns key={`d${divisions}`}>
                    {R.range(0, divisions).map(idx => {
                      const bg =
                        thing === idx && playing
                          ? "has-background-primary"
                          : "has-background-light";
                      const marginTop = divisions === 1 ? 0 : 5;
                      const marginLeft = idx === 0 ? 0 : 10 / divisions;
                      const marginRight =
                        idx === divisions - 1 ? 0 : 10 / divisions;
                      return (
                        <SigColumn
                          key={`d${divisions}-${idx}`}
                          className={`${bg} has-text-centered`}
                          style={{
                            justifyContent: "center",
                            height: 70 / activeBeatKeys.length - marginTop,
                            marginLeft,
                            marginRight,
                            marginTop
                          }}
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
