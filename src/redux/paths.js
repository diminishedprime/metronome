import R from 'ramda'

export const urlRelevantStatePath = R.lensPath(['urlRelevant'])
export const playingPath = R.lensPath(['playing'])
export const bpmPath = R.compose(urlRelevantStatePath, R.lensPath(['bpm']))
export const volumePath = R.compose(
  urlRelevantStatePath,
  R.lensPath(['volume'])
)
export const beatPath = R.lensPath(['beat'])
export const volumeControlPath = R.lensPath(['show volume control'])
export const wheelControlPath = R.lensPath(['show wheel control'])
export const showTimeSignatureSettingsPath = R.lensPath(['show time sig sets'])
export const stylePath = R.lensPath(['styles my man'])
export const beatLengthPath = R.compose(
  urlRelevantStatePath,
  R.lensPath(['beat length path'])
)
export const styleBeatsPath = R.lensPath(['style beats, my man'])
export const styleIndexPath = R.compose(
  urlRelevantStatePath,
  R.lensPath(['style index'])
)
export const editingBPMPath = R.lensPath(['editing bpm'])
export const keymapPath = R.lensPath(['keymap path'])
export const versionPath = R.lensPath(['version path'])
export const audioContextPath = R.lensPath(['audioContext'])

export const volumePathFor = (type) => R.compose(volumePath, R.lensPath([type]))
export const mutePathFor = (type) =>
  R.compose(urlRelevantStatePath, R.lensPath(['mute', type]))

export const newContentAvailablePath = R.lensPath(['new content available'])
