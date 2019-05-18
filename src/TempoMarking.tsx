import React from "react";

interface Marking {
  range: [number, number];
  name: string;
}

export const markings: Array<Marking> = [
  { name: "Larghissimo", range: [0, 24] },
  { name: "Grave", range: [25, 45] },
  { name: "Largo", range: [40, 60] },
  { name: "Lento", range: [45, 60] },
  { name: "Larghetto", range: [60, 66] },
  { name: "Adagio", range: [66, 76] },
  { name: "Andante", range: [76, 108] },
  { name: "Marcia moderato", range: [83, 85] },
  { name: "Andante moderato", range: [92, 112] },
  { name: "Moderato", range: [108, 120] },
  { name: "Allegro", range: [120, 156] },
  { name: "Vivace", range: [156, 176] },
  { name: "Vivacissimo", range: [172, 176] },
  { name: "Allegrissimo", range: [172, 176] },
  { name: "Presto", range: [168, 200] },
  { name: "Prestissimo", range: [200, 250] }
];

const inRange = ([from, to]: [number, number], test: number) => {
  return test >= from && test <= to;
};

const fromBPM = (bpm: number): Array<Marking> => {
  return markings.filter(({ range }) => inRange(range, bpm));
};

interface Props {
  bpm: number;
}

const TempoMarking = ({ bpm }: Props) => {
  const markings = fromBPM(bpm);
  return (
    <div className="columns">
      {markings.map(({ name, range }, idx) => (
        <div key={idx} className="has-text-centered">
          {name} - {range[0]} - {range[1]}
        </div>
      ))}
    </div>
  );
};

export default TempoMarking;
