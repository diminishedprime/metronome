import R from 'ramda'

const playingA = ['playing']
export const playingPath = R.lensPath(playingA)

const radiansA = ['radians']
export const radiansPath = R.lensPath(radiansA)

const bpmA = ['bpm']
export const bpmPath = R.lensPath(bpmA)
