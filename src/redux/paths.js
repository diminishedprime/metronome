import R from 'ramda'

const bufferA = ['buffer']
export const bufferPath = R.lensPath(bufferA)

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
