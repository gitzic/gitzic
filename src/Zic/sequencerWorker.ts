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
    ({ data }: { data: MsgWorker }) => {
        if (data.type === ActionWorker.save) {
            saveSequence(data.notes);
        } else if (data.type === ActionWorker.remove) {
            removeSequences(data.notes);
        } else if (data.type === ActionWorker.saveNote) {
            saveNote(data.note);
        } else if (data.type === ActionWorker.removeNote) {
            removeNote(data.note);
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

function saveNote(note: NoteInWorker) {
    const pos = findSequence(note);
    if (pos) {
        if (pos.trigger !== note.trigger) {
            list[pos.trigger].splice(pos.index, 1);
        }
        list[note.trigger][pos.index] = note;
    } else {
        list[note.trigger].push(note);
    }
}

function saveSequence(notes: NoteInWorker[]) {
    notes.forEach(saveNote);
}

function removeNote(note: NoteInWorker) {
    const pos = findSequence(note);
    pos && list[pos.trigger].splice(pos.index, 1);
}

function removeSequences(notes: NoteInWorker[]) {
    notes.forEach(removeNote);
}

function post(msg: DataOutWorker) {
    (self as any).postMessage(msg);
}

setInterval(() => {
    counter = (counter + 1) % stepsCount;
    list[counter].forEach(({ on, off, duration, slide, ...msg }) => {
        const msDuration = ms * (duration + (slide ? 5 : -1));
        post({ ...msg, msg: on, type: 'on', duration: msDuration });
        setTimeout(
            () => post({ ...msg, msg: off, type: 'off' }),
            msDuration,
        );
    });
}, ms);
