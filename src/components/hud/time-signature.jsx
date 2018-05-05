import React from 'react'
import R from 'ramda'
import {connect} from 'react-redux'
import {
  bpmPath,
  styleIndexPath,
  stylePath,
  beatPath,
  editingBPMPath,
  styleBeatsPath,
  playingPath,
} from '../../redux/paths.js'
import {
  afSetEditingBPM,
  afSetBPM,
  afSetStyle,
  afSetBeatGroup,
} from '../../redux/actions.js'
import {styles} from '../../redux/initial-state.js'

const mapStateToProps = (state) => {
  const style = R.view(stylePath, state)[R.view(styleIndexPath, state)]

  return {
    editingBPM: R.view(editingBPMPath, state),
    bpm: R.view(bpmPath, state),
    styleName: style.name,
    selectedStyle: R.view(styleIndexPath, state),
    beat: R.view(beatPath, state),
    styleBeatsIndex: R.view(styleBeatsPath, state),
    playing: R.view(playingPath, state),
    style,
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEditingBPM: (flag) => () => dispatch(afSetEditingBPM(flag)),
  setBPM: (value) => dispatch(afSetBPM(value)),
  setStyle: (idx) => dispatch(afSetStyle(idx)),
  resetBeatGroup: () => dispatch(afSetBeatGroup(0)),
})

const bpmStyle = {
  fontSize: '3em',
}

const sigContainerStyle = {
  display: 'flex',
  margin: 'auto',
}

const sigStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '2px',
}

const HUD = ({
  playing,
  styleBeatsIndex,
  style,
  beat,
  selectedStyle,
  resetBeatGroup,
  setStyle,
}) => (
  <div style={{display: 'flex', flexDirection: 'column'}}>
    <div style={sigContainerStyle}>
      {beat && (
        <div style={sigStyle}>
          <div style={bpmStyle}>{beat}/</div>
        </div>
      )}
      <div style={sigStyle}>
        <div style={bpmStyle}>
          {style.beats.length === 1 ? (
            <span>{style.beats[0]}</span>
          ) : (
            style.beats
              .reduce((acc, beat, idx) => {
                acc.push(<span key={`${beat}key${idx}`}>+</span>)
                acc.push(
                  <span
                    style={{
                      fontWeight:
                        idx === styleBeatsIndex && playing ? 'bold' : undefined,
                    }}
                    key={`${beat}value${idx}`}
                  >
                    {beat}
                  </span>
                )
                return acc
              }, [])
              .splice(1)
          )}
        </div>
      </div>
    </div>
    <select
      value={selectedStyle}
      onChange={(e) => {
        const optionValue = parseInt(e.target.value, 10)
        resetBeatGroup()
        setStyle(optionValue)
      }}
    >
      {styles.map(({display}, idx) => (
        <option key={display} value={idx}>
          {display}
        </option>
      ))}
    </select>
  </div>
)

export default connect(mapStateToProps, mapDispatchToProps)(HUD)
