import R from 'ramda'

import {
  initialState,
  styles,
} from './initial-state.js'
import {
  SET_EDITING_BPM,
  NEXT_BEAT_GROUP,
  CHANGE_STYLE,
  SHOW_TIME_SIGNATURE_SETTINGS,
  SET_PLAYING,
  ADD_BPM,
  SET_BPM,
  SET_VOLUME,
  SET_BEAT,
  TOGGLE_MUTE,
  NEW_CONTENT_AVAILABLE,
} from './actions.js'
import {
  newContentAvailablePath,
  editingBPMPath,
  styleBeatsPath,
  stylePath,
  styleIndexPath,
  showTimeSignatureSettingsPath,
  beatPath,
  playingPath,
  bpmPath,
} from './paths.js'

const clampBPM = R.pipe(
  R.over(bpmPath, R.clamp(30, 250)),
  R.over(bpmPath, Math.round)
)

const setBPM = (state, {bpm}) => R.pipe(
  R.set(bpmPath, bpm),
  clampBPM
)(state)

const addBpm = (state, {amount}) => R.pipe(
  R.over(bpmPath, R.add(amount)),
  clampBPM
)(state)

const setPlaying = (state, {flag}) =>
  R.set(playingPath, flag, state)

const setVolume = (state, {path, value}) =>
  R.set(path, value, state)

/* const setBeatsPerBar = (state, {beatsPerBar}) =>
 *   R.set(beatsPerBarPath, beatsPerBar, state)*/

const setBeat = (state, {beat}) =>
  R.set(beatPath, beat, state)

const showTimeSignatureSettings = (state, {flag}) =>
  R.set(showTimeSignatureSettingsPath, flag, state)

const changeStyle = (state, {delta}) => {
  const currentStyleIndex = R.view(styleIndexPath, state)
  const numStyles = styles.length
  const nextStyleIndex = (currentStyleIndex + delta) % numStyles
  return R.compose(
    R.set(styleIndexPath, nextStyleIndex < 0 ? styles.length -1 : nextStyleIndex),
    R.set(styleBeatsPath, 0),
    R.over(beatPath, R.ifElse(
      R.equals(undefined),
      R.always(undefined),
      R.always(1)
    ))
  )(state)
}

const nextBeatGroup = (state, _) => {
  const currentStyleIndex = R.view(styleIndexPath, state)
  const styles = R.view(stylePath, state)
  const style = styles[currentStyleIndex]
  const numBeats = style.beats.length
  const currentBeats = R.view(styleBeatsPath, state)
  const nextBeatsIndex = (currentBeats + 1) % numBeats
  return R.set(styleBeatsPath, nextBeatsIndex, state)
}

const setEditingBPM = (state, {flag}) =>
  R.set(editingBPMPath, flag, state)

const toggleMute = (state, {path}) =>
  R.over(path, R.not, state)

export const app = (state=initialState, action) => {
  switch(action.type) {
    case NEW_CONTENT_AVAILABLE: return R.set(newContentAvailablePath, true, state)
    case TOGGLE_MUTE: return toggleMute(state, action)
    case SET_EDITING_BPM: return setEditingBPM(state, action)
    case NEXT_BEAT_GROUP: return nextBeatGroup(state, action)
    case CHANGE_STYLE: return changeStyle(state, action)
    case SHOW_TIME_SIGNATURE_SETTINGS: return showTimeSignatureSettings(state, action)
    case SET_BEAT: return setBeat(state, action)
    case SET_VOLUME: return setVolume(state, action)
    case SET_PLAYING: return setPlaying(state, action)
    case SET_BPM: return setBPM(state, action)
    case ADD_BPM: return addBpm(state, action)
    default:
      if (!(
        action.type.startsWith('async') ||
        action.type.startsWith('@@redux')
      )) {
        // eslint-disable-next-line no-console
        console.log(`${action.type} not handled`)
      }
      return state
  }

}
