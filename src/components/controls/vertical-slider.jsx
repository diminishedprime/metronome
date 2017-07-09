import React from 'react'
import R from 'ramda'

const nubPositionPath = R.lensPath(['nubPosition'])
const outerWidth = 24
const outerHeight = 160
const innerHeight = 40
const innerWidth = outerWidth * 0.8
const innerLeft = outerWidth / 2 - innerWidth / 2
const innerBackground = 'red'
const outerBackground = 'black'

class VerticalSlider extends React.Component {
  constructor() {
    super()

    this.state = R.compose(
      R.set(nubPositionPath, outerHeight - innerHeight)
    )({})

    this.onTouchMove = this.onTouchMove.bind(this)
  }

  onTouchMove(e) {
    const t = e.changedTouches
    const t0 = t[0]
    const {clientY} = t0
    const { top: boxTop, bottom: boxBottom } = this.knobContainer.getBoundingClientRect()
    const relativePosition = clientY - boxTop
    const fixedPosition = R.clamp(0, boxBottom-boxTop-innerHeight, relativePosition)
    this.setState(R.set(nubPositionPath, fixedPosition))
  }

  render() {

    const innerTop = R.view(nubPositionPath, this.state)

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

    const { title } = this.props
    const numBumps = 8

    return (
      <div style={{margin: '1em', textAlign:'center'}}>
        <div>{title}</div>
        <div style={outerStyle} ref={(me) => {
            this.knobContainer = me
          }}>
          <div style={innerStyle} onTouchMove={this.onTouchMove}/>
          {
            R.pipe(
              R.range(0),
              R.map((idx) => {
                const nubHeight = 2
                const nubWidth = R.cond([
                  [R.equals(numBumps/2 - 1), R.always(10)],
                  [R.equals(numBumps/4 - 1), R.always(7.5)],
                  [R.equals(3*numBumps/4 - 1), R.always(7.5)],
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
