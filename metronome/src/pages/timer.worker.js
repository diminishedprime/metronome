// var timerID: NodeJS.Timer = null;
// let interval: number = 100;
// const ctx: Worker = self as any;

// interface StartMessage {
//   interval: number
// }

// interface StopMessage { }

// interface IntervalMessage {
//   interval: number
// }

// interface TimerMessage {
//   type: 'start' | 'stop' | 'interval',
//   data: StartMessage | StopMessage | IntervalMessage,
// }

// const start = ({interval}: StartMessage) => {
//   return setInterval(() => {
//     ctx.postMessage('tick');
//   }, interval);
// }

// ctx.addEventListener("message", ({data: message}: {data: TimerMessage}) => {
//   console.log('thing');
//   switch (message.type) {
//     case 'start': {
//       const startMessage = (message.data as StartMessage);
//       timerID = start(startMessage);
//       break;
//     }
//     case 'stop': {
//       clearInterval(timerID);
//       timerID = null;
//       break;
//     }
//     case 'interval': {
//       const intervalMessage = (message.data as IntervalMessage)
//       interval = intervalMessage.interval;
//       if (timerID) {
//         clearInterval(timerID);
//         timerID = start(intervalMessage);
//       }
//       break;
//     }
//   }
// });