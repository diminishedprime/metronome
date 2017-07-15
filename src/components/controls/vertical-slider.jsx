import React from 'react'
import R from 'ramda'

const outerWidth = 16
const outerHeight = 160
const innerHeight = 30
const innerWidth = outerWidth * 0.8
const innerLeft = outerWidth / 2 - innerWidth / 2
const innerBackground = 'red'
const outerBackground = 'black'

class VerticalSlider extends React.Component {
  constructor() {
    super()
    this.onTouchMove = this.onTouchMove.bind(this)
    this.onClick = this.onClick.bind(this)
    this.setY = this.setY.bind(this)
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

  render() {

    const { title, value } = this.props
    const innerTop = (1 - value) * (outerHeight - innerHeight)

    const outerStyle = {
      position: 'relative',
      background: outerBackground,
      width: `${outerWidth}px`,
      height: `${outerHeight}px`,
    }

    const innerStyle = {
      position: 'absolute',
      top: `${innerTop}px`,
      left: `${innerLeft}px`,
      background: innerBackground,
      width: `${innerWidth}px`,
      height: `${innerHeight}px`,
      cursor: 'pointer',

    }

    const numBumps = 7

    return (
      <div style={{margin: '0.75em', textAlign:'center'}}>
        <div style={{display: 'flex', height: '25px', alignItems: 'center', justifyContent: 'center'}}>{title}</div>
        <div style={outerStyle} onClick={this.onClick} ref={(me) => {
          this.knobContainer = me
        }}>
          <div style={innerStyle} onTouchMove={this.onTouchMove}/>
          {
            R.pipe(
              R.range(0),
              R.map((idx) => {
                const nubHeight = 2
                const nubWidth = R.cond([
                  [R.equals(3), R.always(10)],
                  [R.equals(5), R.always(7.5)],
                  [R.equals(1), R.always(7.5)],
                  [R.T, R.always(5)],
                ])(idx)
                const nubLeft = outerWidth + (10 - nubWidth / 2)
                const style = {
                  position: 'absolute',
                  left: `${nubLeft}px`,
                  top: `${outerHeight / numBumps * idx + outerHeight/numBumps/2-nubHeight/2}px`,
                  background: 'green',
                  width: `${nubWidth}px`,
                  height: `${nubHeight}px`,
                }
                return (
                  <div key={idx} style={style} />
                )
              })
            )(numBumps)
          }
        </div>
      </div>
    )
  }
}

export default VerticalSlider
