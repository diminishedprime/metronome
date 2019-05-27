import React from "react";
import * as immutable from "immutable";
import * as R from "ramda";

interface Marking {
  high: number;
  low: number;
  name: string;
}

export const markings: immutable.List<Marking> = immutable.List([
  { name: "Larghissimo", low: 0, high: 24 },
  { name: "Grave", low: 25, high: 45 },
  { name: "Largo", low: 40, high: 60 },
  { name: "Lento", low: 45, high: 60 },
  { name: "Larghetto", low: 60, high: 66 },
  { name: "Adagio", low: 66, high: 76 },
  { name: "Andante", low: 76, high: 108 },
  { name: "Marcia moderato", low: 83, high: 85 },
  { name: "Andante moderato", low: 92, high: 112 },
  { name: "Moderato", low: 108, high: 120 },
  { name: "Allegro", low: 120, high: 156 },
  { name: "Vivace", low: 156, high: 176 },
  { name: "Vivacissimo", low: 172, high: 176 },
  { name: "Allegrissimo", low: 172, high: 176 },
  { name: "Presto", low: 168, high: 200 },
  { name: "Prestissimo", low: 200, high: 250 }
]);

const inRange = (to: number, from: number, test: number) => {
  return test >= from && test <= to;
};

const fromBPM = R.memoizeWith(
  a => "" + a,
  (bpm: number): immutable.List<Marking> =>
    markings.filter(({ high, low }) => inRange(high, low, bpm))
);

interface Props {
  bpm: number;
}

interface MarkingProps {
  name: string;
  low: number;
  high: number;
}

const Marking: React.FC<MarkingProps> = React.memo(({ name, low, high }) => {
  return (
    <div className="has-text-centered">
      {name} - {low} - {high}
    </div>
  );
});

const TempoMarking = React.memo(
  ({ bpm }: Props) => {
    const markings = fromBPM(bpm);
    return (
      <div style={{ minHeight: "6.5em" }}>
        {markings.map(({ name, high, low }) => (
          <Marking key={`marking-${name}`} name={name} high={high} low={low} />
        ))}
      </div>
    );
  },
  ({ bpm: old }, { bpm: newbpm }) => fromBPM(old).equals(fromBPM(newbpm))
);

export default TempoMarking;
