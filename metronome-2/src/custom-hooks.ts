import {useEffect, useRef} from 'react'

export const useInterval = (cb: Function, delay: number | undefined) => {
  const savedCallback = useRef<Function>()
  useEffect(() => {
    savedCallback.current = cb
  })
  useEffect(() => {
    if (delay !== undefined) {
      const tick = () => {
        savedCallback.current!()
      }
      const id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
