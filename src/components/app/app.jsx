import React from 'react'
import R from 'ramda'
import { connect } from 'react-redux'
import HUD from '../hud/hud.jsx'
import Controls from '../controls/controls.jsx'
import CommonTempos from '../controls/common-tempos.jsx'
import {
  versionPath,
} from '../../redux/paths.js'
import './app.css'


const style = {
  fontFamily: 'Helvetica',
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto',
}

const mapStateToProps = (state) => ({
  version: R.view(versionPath, state),
})

const App = ({version}) => (
  <div style={style}>
  <CommonTempos />
  <HUD />
  <Controls />
  {
    /iPad|iPhone|iPod/.test(navigator.userAgent) &&
    !window.MSStream &&
    <button onClick={
      () => {
        const ctx = new window.webkitAudioContext()
        const osc = ctx.createOscillator()
        const gain = ctx.createGain()
        gain.gain.value = 0
        osc.connect(gain)
        gain.connect(ctx.destination)
        osc.start(ctx.currentTime)
        osc.stop(ctx.currentTime + 0.05)
      }
                    }
            style={{width: '100px', alignSelf: 'center'}}>
      IPhone Fix
    </button>
  }
  <div style={{textAlign: 'center'}}>v{version}</div>
  </div>
)
export default connect(
  mapStateToProps
)(App)
