import React from "react";
import * as R from "ramda";
import styled from "styled-components";
import { useToggle } from "./hooks";
import { Button } from "./Common";
import { Signature, Division } from "./types";

interface Props {
  signature: Signature;
  activeSubDivisions: Division[][];
}

const SigColumn = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SigColumns = styled.div`
  display: flex;
  height: 20px;
`;

const TimeSignature = ({ signature: { beats }, activeSubDivisions }: Props) => {
  const numerator = beats.length;
  const [edit, toggleEdit] = useToggle(false);
  const set = (numerator: number, denominator = 4) => () => {
    // overSignature((old) => {
    //     return {...old, numerator, denominator}
    // });
    // toggleEdit();
  };
  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className="section is-mobile columns"
        onClick={toggleEdit}
      >
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
                        current === idx ? "has-background-primary" : "";
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
          <Button onClick={set(2)}>2/4</Button>
          <Button onClick={set(3)}>3/4</Button>
          <Button onClick={set(4)}>4/4</Button>
          <Button onClick={set(5)}>5/4</Button>
        </section>
      )}
    </>
  );
};

export default TimeSignature;
