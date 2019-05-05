import {useEffect, useRef} from 'react'

export const useInterval = (cb: Function, delay: number | undefined) => {
  const savedCallback = useRef<Function>()
  useEffect(() => {
    savedCallback.current = cb
  })
  useEffect(() => {
    if (delay !== undefined) {
      const id = setInterval(savedCallback.current, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
