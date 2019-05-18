import React from "react";
import { SubDivision } from "./types";
import { Button } from "./Common";

type Toggle = (idx: number) => void;

interface Props {
  subDivisions: Array<SubDivision>;
  toggle: Toggle;
}

type ControlProps = SubDivision & { idx: number; toggle: Toggle };

const Control = ({ on, label, idx, toggle, ...props }: ControlProps) => (
  <Button
    key={label}
    {...props}
    onClick={() => toggle(idx)}
    className={`column button ${on ? "is-success" : ""}`}
  >
    {label}
  </Button>
);

const SubDivisions = ({ subDivisions, toggle, ...props }: Props) => (
  <>
    {subDivisions.map((subDivision, idx) => (
      <Control key={idx} {...subDivision} idx={idx} toggle={toggle} />
    ))}
  </>
);

export default SubDivisions;
