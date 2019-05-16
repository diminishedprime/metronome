import React from "react";
import { SubDivision } from "./types";
import styled from "styled-components";

type Toggle = (idx: number) => void;

interface Props {
  subDivisions: Array<SubDivision>;
  toggle: Toggle;
}

type ControlProps = SubDivision & { idx: number; toggle: Toggle };

const Control = styled(({ on, label, idx, toggle, ...props }: ControlProps) => (
  <div key={label} {...props} onClick={() => toggle(idx)}>
    {label}
  </div>
))`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4vh;
  background-color: #c0ffee;
opacity: ${({ on }) => (on ? 1 : 0.2)}
  width: 100%;
  margin-left: 1px;
  margin-right: 1px;
`;

const SubDivisions = styled(({ subDivisions, toggle, ...props }: Props) => (
  <div {...props}>
    {subDivisions.map((subDivision, idx) => (
      <Control key={idx} {...subDivision} idx={idx} toggle={toggle} />
    ))}
  </div>
))`
  display: flex;
  justify-content: space-around;
  width: 100%;
  margin-top: 5px;
`;

export default SubDivisions;
