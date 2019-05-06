import React from 'react'
import {SubDivision} from './types'
import styled from 'styled-components'

type Toggle = (idx: number) => void

interface Props {
  subDivisions: Array<SubDivision>
  toggle: Toggle
}

type ControlProps = SubDivision & {idx: number; toggle: Toggle}

const Control = styled(({on, label, idx, toggle, ...props}: ControlProps) => (
  <div key={label} {...props}>
    <label>{label}</label>
    <input type="checkbox" checked={on} onChange={() => toggle(idx)} />
  </div>
))`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 4vh;
`

const SubDivisions = styled(({subDivisions, toggle, ...props}: Props) => (
  <div {...props}>
    {subDivisions.map((subDivision, idx) => (
      <Control {...subDivision} idx={idx} toggle={toggle} />
    ))}
  </div>
))`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

export default SubDivisions
