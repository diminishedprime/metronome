import R from 'ramda'

export const playingPath = R.lensPath(['playing'])
export const bpmPath = R.lensPath(['bpm'])
export const volumePath = R.lensPath(['volume'])
export const beatPath = R.lensPath(['beat'])
export const volumeControlPath = R.lensPath(['show volume control'])
export const wheelControlPath = R.lensPath(['show wheel control'])
export const showTimeSignatureSettingsPath = R.lensPath(['show time sig sets'])
export const stylePath = R.lensPath(['styles my man'])
export const beatLengthPath = R.lensPath(['beat length path'])
export const styleBeatsPath = R.lensPath(['style beats, my man'])
export const styleIndexPath = R.lensPath(['style index'])
export const editingBPMPath = R.lensPath(['editing bpm'])
export const keymapPath = R.lensPath(['keymap path'])
export const versionPath = R.lensPath(['version path'])
export const audioContextPath = R.lensPath(['audioContext'])

export const volumePathFor = (type) => R.lensPath(['volume', type])
export const mutePathFor = (type) => R.lensPath(['mute', type])

export const newContentAvailablePath = R.lensPath(['new content available'])
