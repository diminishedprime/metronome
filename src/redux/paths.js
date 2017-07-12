import R from 'ramda'

const bufferA = (bufferName) => ['buffer', bufferName]
export const bufferPath = (bufferName) => R.lensPath(bufferA(bufferName))

const playingA = ['playing']
export const playingPath = R.lensPath(playingA)

const bpmA = ['bpm']
export const bpmPath = R.lensPath(bpmA)

const volumeA = ['volume']
export const volumePath = R.lensPath(volumeA)

const masterVolumeA = [...volumeA, 'master']
export const masterVolumePath = R.lensPath(masterVolumeA)

const quarterVolumeA = [...volumeA, 'quarter']
export const quarterVolumePath = R.lensPath(quarterVolumeA)

const eighthVolumeA = [...volumeA, 'eighth']
export const eighthVolumePath = R.lensPath(eighthVolumeA)

const sixteenthVolumeA = [...volumeA, 'sixteenth']
export const sixteenthVolumePath = R.lensPath(sixteenthVolumeA)

const tripletVolumeA = [...volumeA, 'triplet']
export const tripletVolumePath = R.lensPath(tripletVolumeA)

export const beatsPerBarPath = R.lensPath(['beats per bar'])
export const beatPath = R.lensPath(['beat'])
