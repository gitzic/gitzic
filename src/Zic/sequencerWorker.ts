import {
    ActionWorker,
    MAX_STEPS_PER_BEAT,
    MsgWorker,
    NoteInWorker,
    DataOutWorker,
} from '../interface';

const ms = 75;
let counter = 0;
const stepsCount = MAX_STEPS_PER_BEAT * 4;
const list: NoteInWorker[][] = [];
for (let n = 0; n < stepsCount; n++) {
    list[n] = [];
}

self.addEventListener(
    'message',
    ({ data: { action, notes} }: { data: MsgWorker }) => {
        if (action === ActionWorker.save) {
            saveSequence(notes);
        } else if (action === ActionWorker.remove) {
            removeSequences(notes);
        }
    },
    false,
);

function findSequence(note: NoteInWorker) {
    for (let trigger = 0; trigger < list.length; trigger++) {
        const index = list[trigger].findIndex(({ id }) => id === note.id);
        if (index !== -1) {
            return { trigger, index };
        }
    }
}

function saveSequence(notes: NoteInWorker[]) {
    notes.forEach((note) => {
        const pos = findSequence(note);
        if (pos) {
            if (pos.trigger !== note.trigger) {
                list[pos.trigger].splice(pos.index, 1);
            }
            list[note.trigger][pos.index] = note;
        } else {
            list[note.trigger].push(note);
        }
    });
}

function removeSequences(sequences: NoteInWorker[]) {}

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
