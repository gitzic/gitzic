self.addEventListener(
    'message',
    ({ data }) => {
        (self as any).postMessage('WORKER STARTED: ' + data.msg);
    },
    false,
);

let count = 0;
setInterval(() => {
    (self as any).postMessage('count: ' + count++);
}, 1000);


const context = new AudioContext()
// clock = new WAAClock(context, {toleranceEarly: 0.1})
// clock.start()