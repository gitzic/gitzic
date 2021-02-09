import {
    ActionWorker,
    MAX_STEPS_PER_BEAT,
    MsgWorker,
    DataInWorker,
    DataOutWorker,
} from '../interface';

const ms = 75;
let counter = 0;
const stepsCount = MAX_STEPS_PER_BEAT * 4;
const list: DataInWorker[][] = [];
for (let n = 0; n < stepsCount; n++) {
    list[n] = [];
}

self.addEventListener(
    'message',
    ({ data }: { data: MsgWorker }) => {
        if (data.action === ActionWorker.save) {
            saveSequences(data.data);
        } else if (data.action === ActionWorker.remove) {
            removeSequences(data.data);
        }
    },
    false,
);

function findSequence(sequence: DataInWorker) {
    for (let trigger = 0; trigger < list.length; trigger++) {
        const index = list[trigger].findIndex(({ id }) => id === sequence.id);
        if (index !== -1) {
            return { trigger, index };
        }
    }
}

function saveSequences(sequences: DataInWorker[]) {
    sequences.forEach((sequence) => {
        const pos = findSequence(sequence);
        if (pos) {
            if (pos.trigger !== sequence.trigger) {
                list[pos.trigger].splice(pos.index, 1);
            }
            list[sequence.trigger][pos.index] = sequence;
        } else {
            list[sequence.trigger].push(sequence);
        }
    });
}

function removeSequences(sequences: DataInWorker[]) {}

function post(msg: DataOutWorker) {
    (self as any).postMessage(msg);
}

setInterval(() => {
    counter = (counter + 1) % stepsCount;
    list[counter].forEach(({ on, off, duration, slide, ...msg }) => {
        post({ ...msg, data: on });
        setTimeout(
            () => post({ ...msg, data: off }),
            ms * (duration + (slide ? 5 : 0)),
        );
    });
}, ms);
