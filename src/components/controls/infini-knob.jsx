import React from 'react'
import R from 'ramda'

const totalDiffPath = R.lensPath(['totalDiff'])
const radiansPath = R.lensPath(['radians'])

class InfiniKnob extends React.Component {
  constructor() {
    super()
    this.state = R.compose(
      R.set(totalDiffPath, 0),
      R.set(radiansPath, Math.PI)
    )({})
    this.addToBuffer = this.addToBuffer.bind(this)
    this.onTouchMove = this.onTouchMove.bind(this)
  }

  addToBuffer(diff) {
    const totalDiff = this.state.totalDiff
    const threshold = this.props.theshold || 0.1
    if (Math.abs(totalDiff) < threshold) {
      this.setState(R.over(totalDiffPath, R.add(diff)))
    } else {
      const emitDelta = this.props.emitDelta
      if (emitDelta) {
        const delta = ((totalDiff > 0) ? -1 : 1)
        emitDelta(delta)
      } else {
        // eslint-disable-next-line no-console
        console.log('Don\'t forget to add an emitDelta prop')
      }
      this.setState(R.set(totalDiffPath, 0))
    }
  }

  onTouchMove(e) {
    const t = e.changedTouches
    const t0 = t[0]
    const {clientX, clientY} = t0

    const box = this.knobContainer.getBoundingClientRect()
    const boxCenter = {
      x:  box.left + box.width / 2,
      y: box.top + box.height / 2,
    }
    const y = -(boxCenter.y - clientY)
    const x = -(boxCenter.x - clientX)
    const radians = Math.atan2(y, x)
    const currentRadians = R.view(radiansPath, this.state)
    const diff = currentRadians - radians
    this.addToBuffer(diff)
    this.setState(R.set(radiansPath, radians))
  }

  render() {
    const radians = R.view(radiansPath, this.state)

    const {
      size=300,
      outerStyle={
        backgroundColor: 'green',
      },
      innerStyle={
        backgroundColor: 'red',
      },
    } = this.props

    const outerCircleStyle = R.merge(outerStyle, {
      position: 'relative',
      height: size,
      width: size,
      borderRadius: size,
    })
    const innerCircleStyle = R.merge(innerStyle, {
      width: size/2,
      height: size/2,
      borderRadius: size/2,
      position: 'absolute',
      top: size*0.25 + Math.sin(radians) * size*(1/4),
      left: size*0.25 + Math.cos(radians) * size*(1/4),
    })

    return (
      <div style={outerCircleStyle}
        ref={(me) => {
          this.knobContainer = me
        }}>
        <div onTouchMove={this.onTouchMove} style={innerCircleStyle}/>
      </div>
    )
  }
}

export default InfiniKnob
