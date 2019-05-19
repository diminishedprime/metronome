import React from "react";
import * as R from "ramda";
import { Signature } from "./types";
import { useToggle } from "./hooks";
import { Button } from "./Common";

interface Props {
  signature: Signature;
  currentBeat: number | undefined;
  setSignature: (s: Signature) => void;
}

const TimeSignature = ({
  setSignature,
  signature: { numerator },
  currentBeat
}: Props) => {
  const [edit, toggleEdit] = useToggle(false);
  const set = (numerator: number, denominator = 4) => () => {
    setSignature({ numerator, denominator });
    toggleEdit();
  };
  return (
    <>
      <section
        style={{ marginTop: "10px" }}
        className="section is-mobile columns"
        onClick={toggleEdit}
      >
        {R.range(0, numerator).map((beat: number) => {
          const bg =
            beat === currentBeat
              ? "has-background-primary"
              : "has-background-light";
          return (
            <div
              className={`column margin-sm has-text-centered ${bg}`}
              key={beat}
            >
              {beat + 1}
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
