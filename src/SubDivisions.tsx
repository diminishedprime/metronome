import React from "react";
import { SubDivision } from "./types";
import styled from "styled-components";

type Toggle = (idx: number) => void;

interface Props {
  subDivisions: Array<SubDivision>;
  toggle: Toggle;
}

type ControlProps = SubDivision & { idx: number; toggle: Toggle };

const Control = ({ on, label, idx, toggle, ...props }: ControlProps) => (
  <button key={label} {...props} onClick={() => toggle(idx)} className={`column button ${on ? 'is-success' : ''}`}>
    {label}
  </button>
)

const SubDivisions = ({ subDivisions, toggle, ...props }: Props) => (
  <section className='section'>
  <div {...props} className='columns is-mobile buttons'>
    {subDivisions.map((subDivision, idx) => (
      <Control key={idx} {...subDivision} idx={idx} toggle={toggle} />
    ))}
  </div>
  </section>
)

export default SubDivisions;
