import React from "react";
import * as R from "ramda";
import { Signature } from "./types";

interface Props {
  signature: Signature;
  currentBeat: number;
}

const TimeSignature = ({ signature: { numerator }, currentBeat }: Props) => {
  return (
    <section className="section is-mobile columns">
      {R.range(0, numerator).map((beat: number) => {
        const bg =
          beat + 1 === currentBeat
            ? "has-background-primary"
            : "has-background-light";
        return (
          <div className={`column has-text-centered ${bg}`} key={beat}>
            {beat + 1}
          </div>
        );
      })}
    </section>
  );
};

export default TimeSignature;
