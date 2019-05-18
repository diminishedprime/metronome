import React from "react";
import { SubDivision } from "./types";
import { Button } from "./Common";

type Toggle = (idx: number) => void;

interface Props {
  subDivisions: Array<SubDivision>;
  toggle: Toggle;
}

const SubDivisions = ({ subDivisions, toggle }: Props) => (
  <>
    {subDivisions.map(({ label, on }, idx) => (
      <Button
        classes={[on ? "is-primary" : ""]}
        key={idx}
        onClick={() => toggle(idx)}
      >
        {label}
      </Button>
    ))}
  </>
);

export default SubDivisions;
