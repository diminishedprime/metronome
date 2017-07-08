import R from 'ramda'

const playingA = ['playing']
export const playingPath = R.lensPath(playingA)

const bpmA = ['bpm']
export const bpmPath = R.lensPath(bpmA)
