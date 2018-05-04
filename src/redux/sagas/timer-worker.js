const workerCode = () => {
  let timerID = null
  let interval = 100

  //eslint-disable-next-line
  self.onmessage = function({data}) {
    if (data === 'start') {
      timerID = setInterval(() => this.postMessage('tick'), interval)
    } else if (data.interval) {
      interval = data.interval
      if (timerID) {
        clearInterval(timerID)
        timerID = setInterval(() => this.postMessage('tick'), interval)
      }
    } else if (data === 'stop') {
      clearInterval(timerID)
      timerID = null
    }
  }
}

let code = workerCode.toString()
code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'))

const blob = new Blob([code], {type: 'application/javascript'})

export default () => {
  return new Worker(URL.createObjectURL(blob))
}
