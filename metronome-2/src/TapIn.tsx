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
  const [taps, setTaps] = useState<number[]>([])

  const onTap = () => {
    const now = performance.now()
    const newTaps = R.append(now, taps).filter((tap) => now - tap < 3000)
    if (newTaps.length > 1) {
      const bpm = calculateBPM(newTaps)
      setBPM(bpm)
    }
    setTaps(newTaps)
  }

  return <button onClick={onTap}>Tap</button>
}

export default TapIn
