import React, {useRef, useEffect, ReactChildren} from 'react'
import {Flow as VF} from 'vexflow'
import {Signature} from './types'
import * as R from 'ramda'
import styled, {StyledProps} from 'styled-components'

interface Props {
  signature: Signature
  currentBeat: number
}

const BeatContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`

interface BeatProps {
  active: boolean
}

const BeatBase = ({active, ...props}: BeatProps) => <div {...props} />

const Beat = styled(BeatBase)`
  height: 10px;
  width: 10px;
  margin: 10px;
  background-color: ${({active}: BeatProps) => (active ? 'green' : 'black')};
`

const Beats = ({signature: {numerator}, currentBeat}: Props) => {
  return (
    <BeatContainer>
      {R.range(0, numerator).map((beat) => (
        <Beat key={beat} active={beat + 1 === currentBeat} />
      ))}
    </BeatContainer>
  )
}

const TimeSignatureWrapper = styled.div`
  display: flex;
`

const TimeSignature = (props: Props) => {
  const {
    signature: {numerator, denominator},
  } = props
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current != null) {
      // @ts-ignore
      const renderer = new VF.Renderer(ref.current, VF.Renderer.Backends.SVG)
      renderer.resize(30, 50)
      var context = renderer.getContext()
      var stave = new VF.Stave(0, 0, 30, {
        space_above_staff_ln: 0,
        space_below_staff_ln: 0,
      })
      const timeSig = `${numerator}/${denominator}`
      stave.addTimeSignature(timeSig)
      stave.setContext(context).draw()
    }
  }, [ref, denominator, numerator])

  return (
    <TimeSignatureWrapper>
      <div ref={ref} />
      <Beats {...props} />
    </TimeSignatureWrapper>
  )
}

export default TimeSignature
