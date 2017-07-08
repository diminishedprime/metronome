import React from 'react'
import { connect } from 'react-redux'
import StartStop from './start-stop.jsx'

const InfiniKnob = connect(
  (state) => ({
    radians: state.radians,
    size: state.size,
  }),
  (dispatch) => ({
    onTouchMove: (e) => {
      const t = e.changedTouches
      const t0 = t[0]
      const {clientX, clientY} = t0

      const box = document.getElementById('knob1').getBoundingClientRect()
      const boxCenter = {
        x:  box.left + box.width / 2,
        y: box.top + box.height / 2,
      }
      const y = -(boxCenter.y - clientY)
      const x = -(boxCenter.x - clientX)
      const radians = Math.atan2(y, x)
      dispatch({type: 'async setRadians', radians})
    },
  })
)(({radians, size, id, onTouchMove}) => {
  return (
    <div className="knobContainer"
         style={{
           position: 'relative',
           height: size,
           width: size,
           borderRadius: size,
         }}
         id={id}
    >
      <div className="knobCircle"
           onTouchMove={onTouchMove}
           id={`${id}Circle`}
           style={{
             width: size/2,
             height: size/2,
             borderRadius: size/2,
             position: 'absolute',
             top: size*0.25 + Math .sin(radians) * size*(1/4),
             left: size*0.25 + Math.cos(radians) * size*(1/4),
           }}
      />
    </div>
  )
})

const Controls = () => (
  <div>
    <InfiniKnob id="knob1"/>
    <StartStop />
  </div>
)

export default Controls
