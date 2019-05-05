import React, {useState} from 'react'
import * as R from 'ramda'

interface Props {
  setBPM: (bpm: number) => void
}

const calculateBPM = R.pipe(
  (tapTimes: number[]) => R.aperture(2, tapTimes),
  R.map(([a, b]) => b - a),
  R.mean,
  R.divide(60000),
  Math.trunc
)

const TapIn = ({setBPM}: Props) => {
  const [, setTaps] = useState<number[]>([])

  const onTap = () => {
    const now = performance.now()
    setTaps((taps) => {
      const newTaps = R.append(now, taps).filter((tap) => now - tap < 3000)
      console.log(newTaps)
      if (newTaps.length > 2) {
        const bpm = calculateBPM(newTaps)
        console.log(bpm)
        setBPM(bpm)
      }
      return newTaps
    })
  }

  return <button onClick={onTap}>Tap</button>
}

export default TapIn
