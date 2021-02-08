import { ActionWorker, MsgWorker, SequenceWorker } from '../interface';

const ms = 150;
let counter = 0;
const stepsCount = 16;
const list: SequenceWorker[][] = [];
for (let n = 0; n < stepsCount; n++) {
    list[n] = [];
}

self.addEventListener(
    'message',
    ({ data }: { data: MsgWorker }) => {
        if (data.action === ActionWorker.save) {
            saveSequences(data.sequences);
        } else if (data.action === ActionWorker.remove) {
            removeSequences(data.sequences);
        }
    },
    false,
);

function findSequence(sequence: SequenceWorker) {
    for (let trigger = 0; trigger < list.length; trigger++) {
        const index = list[trigger].findIndex(({ id }) => id === sequence.id);
        if (index !== -1) {
            return { trigger, index };
        }
    }
}

function saveSequences(sequences: SequenceWorker[]) {
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

function removeSequences(sequences: SequenceWorker[]) {}

setInterval(() => {
    counter = (counter + 1) % stepsCount;
    list[counter].forEach((sequence) => {
        (self as any).postMessage(sequence);
    });
}, ms);
