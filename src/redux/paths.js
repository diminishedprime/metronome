import R from 'ramda'

const bufferA = ['buffer']
export const bufferPath = R.lensPath(bufferA)

const playingA = ['playing']
export const playingPath = R.lensPath(playingA)

const bpmA = ['bpm']
export const bpmPath = R.lensPath(bpmA)
