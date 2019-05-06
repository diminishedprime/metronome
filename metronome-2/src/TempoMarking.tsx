import React from 'react'
import styled from 'styled-components'

interface Marking {
  range: [number, number]
  name: string
}

export const markings: Array<Marking> = [
  {name: 'Larghissimo', range: [0, 24]},
  {name: 'Grave', range: [25, 45]},
  {name: 'Largo', range: [40, 60]},
  {name: 'Lento', range: [45, 60]},
  {name: 'Larghetto', range: [60, 66]},
  {name: 'Adagio', range: [66, 76]},
  {name: 'Andante', range: [76, 108]},
  {name: 'Marcia moderato', range: [83, 85]},
  {name: 'Andante moderato', range: [92, 112]},
  {name: 'Moderato', range: [108, 120]},
  {name: 'Allegretto', range: [112, 120]},
  {name: 'Allegro moderato', range: [116, 120]},
  {name: 'Allegro', range: [120, 156]},
  {name: 'Vivace', range: [156, 176]},
  {name: 'Vivacissimo', range: [172, 176]},
  {name: 'Allegrissimo', range: [172, 176]},
  {name: 'Presto', range: [168, 200]},
  {name: 'Prestissimo', range: [200, 250]},
]

const inRange = ([from, to]: [number, number], test: number) => {
  return test >= from && test <= to
}

const fromBPM = (bpm: number): Array<Marking> => {
  return markings.filter(({range}) => inRange(range, bpm))
}

interface Props {
  bpm: number
}

const Name = styled.div`
  font-size: 3vh;
  margin-right: 1vh;
`

const Range = styled(({range, ...props}: {range: [number, number]}) => (
  <div {...props}>
    {range[0]} - {range[1]}
  </div>
))``

const Tempo = styled(({name, range, ...props}: Marking) => (
  <div {...props}>
    <Name>{name}</Name>
    <Range range={range} />
  </div>
))`
  display: flex;
  align-items: baseline;
`

const TempoMarking = styled(({bpm, ...props}: Props) => {
  const markings = fromBPM(bpm)
  return (
    <div {...props}>
      {markings.map((props) => (
        <Tempo {...props} />
      ))}
    </div>
  )
})`
  display: flex;
  width: 100%;
  flex-direction: column;
`

export default TempoMarking
