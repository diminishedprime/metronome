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

    const {size=300} = this.props

    const innerColor = '#bfa100'
    const outerColor = '#ffd700'
    const gradientIn = `radial-gradient(circle farthest-corner at ${size/4}px ${size/4}px , ${innerColor} 0%, ${outerColor} 100%)`
    const gradientOut = `radial-gradient(circle farthest-corner at ${size/4}px ${size/4}px , ${outerColor} 0%, ${innerColor} 100%)`

    const {
      outerStyle={
        backgroundColor: outerColor,
        backgroundImage: gradientOut,
      },
      innerStyle={
        backgroundColor: innerColor,
        backgroundImage: gradientIn,
      },
    } = this.props

    const outerCircleStyle = R.merge(outerStyle, {
      position: 'relative',
      height: size,
      width: size,
      borderRadius: size,
    })

    const innerCircleStyle = R.merge(innerStyle, {
      width: size/3,
      height: size/3,
      borderRadius: size/3,
      position: 'absolute',
      top: size/2 + Math.sin(radians) * (size/4) + Math.sin(radians) * size/16 - size/6,
      left: size/2 + Math.cos(radians) * (size/4) + Math.cos(radians) * size/16 - size/6,
    })

    const lilNubStyle = (offset) => R.merge(innerStyle, {
      position: 'absolute',
      width: size/16,
      height: size/16,
      borderRadius: size/16,
      top:  size/2 + Math.sin(radians + offset) * size/4 + Math.sin(radians + offset) * size/8 - size/32,
      left: size/2 + Math.cos(radians + offset) * size/4 + Math.cos(radians + offset) * size/8 - size/32,
      backgroundColor: innerColor,
    })

    return (
      <div style={outerCircleStyle}
        ref={(me) => {
          this.knobContainer = me
        }}>
        <div onTouchMove={this.onTouchMove} style={innerCircleStyle}/>
        <div style={lilNubStyle(Math.PI)} />
        <div style={lilNubStyle(Math.PI * (1/2))} />
        <div style={lilNubStyle(Math.PI * (1/4))} />
        <div style={lilNubStyle(Math.PI * (3/4))} />
        <div style={lilNubStyle(Math.PI * -(1/2))} />
        <div style={lilNubStyle(Math.PI * -(1/4))} />
        <div style={lilNubStyle(Math.PI * -(3/4))} />
      </div>
    )
  }
}

export default InfiniKnob
