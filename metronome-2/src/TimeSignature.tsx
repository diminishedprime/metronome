import React, {useRef, useEffect} from 'react'
import {Flow as VF} from 'vexflow'
import {Signature} from './types'

interface Props {
  signature: Signature
}

const TimeSignature = ({signature: {numerator, denominator}}: Props) => {
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

  return <div ref={ref} />
}

export default TimeSignature
