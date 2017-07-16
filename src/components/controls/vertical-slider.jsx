import React from 'react'
import R from 'ramda'

const numBumps = 7
class VerticalSlider extends React.Component {
  constructor() {
    super()
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onClick = this.onClick.bind(this)
    this.setY = this.setY.bind(this)
    this.setKnob = this.setKnob.bind(this)
  }

  setY({clientY}) {
    const { top: boxTop, bottom: boxBottom } = this.knobContainer.getBoundingClientRect()
    const relativePosition = clientY - boxTop
    const min = 0
    const max = (boxBottom - boxTop)
    const fixedPosition = R.clamp(min, max, relativePosition)
    const { onChange } = this.props
    if (!onChange) {
      // eslint-disable-next-line no-console
      console.log('Don\'t forget to pass in an onChange prop')
    } else {
      onChange(1 - (fixedPosition / max))
    }
  }

  onClick(e) {
    this.setY(e)
  }

  onTouchMove(e) {
    const t = e.changedTouches
    const t0 = t[0]
    this.setY(t0)
  }

  setKnob(me) {
    this.knobContainer = me
  }

  renderBump(idx) {
    const height = 0.5
    const width = R.cond([
      [R.equals(3), R.always(60)],
      [R.equals(5), R.always(40)],
      [R.equals(1), R.always(40)],
      [R.T, R.always(20)],
    ])(idx)
    const style = {
      zIndex: 0,
      position: 'absolute',
      left: `${(100 - width) / 2}%`,
      top: `${(100 - height)/numBumps * idx + (100/numBumps/2)}%`,
      background: 'green',
      width: `${width}%`,
      height: `${height}%`,
    }
    return (<div key={idx} style={style} />)
  }

  renderBumps() {
    return R.pipe(
      R.range(0),
      R.map(this.renderBump)
    )(numBumps)
  }

  render() {
    const { value, width=15 } = this.props
    const sliderHeight = 5
    const innerTop = Math.round((1 - value) * (100 - sliderHeight))

    const outerStyle = {
      position: 'relative',
      height: '100%',
      width: '100%',
      backgroundColor: 'black',
    }
    const innerStyle = {
      zIndex: 1,
      position: 'absolute',
      top: `${innerTop}%`,
      left: '0',
      backgroundColor: 'orange',
      height: `${sliderHeight}%`,
      width: '100%',
    }
    return (
      <div style={{height: '100%', width: width, display: 'flex'}}>
        <div style={outerStyle} onClick={this.onClick} ref={this.setKnob}>
          <div style={innerStyle} onTouchMove={this.onTouchMove}/>
          { this.renderBumps() }
        </div>
      </div>
    )
  }
}

export default VerticalSlider
