import {
    ActionWorkerNote,
    ActionWorkerSequence,
    MAX_STEPS_PER_BEAT,
    MsgWorker,
    NoteInWorker,
} from '../interface';
import { getOutput } from './output';
import { Note, SequenceData } from './sequence';

export const worker = new Worker('sequencerWorker.ts');

worker.addEventListener(
    'message',
    function ({ data }) {
        // const {  } = data as DataOutWorker;
        const output = getOutput()[data.outputId];
        if (output) {
            output.send(data.data);
        }
    },
    false,
);

function getNote({id, outputId}: SequenceData) {
    return ({ velocity, midi: note, duration, time, slide }: Note) => {
        return {
            id: `midi-${id}-${time}`,
            // ToDo: we could actually skip all the following for stop note
            outputId,
            trigger: time * MAX_STEPS_PER_BEAT,
            duration: duration * MAX_STEPS_PER_BEAT,
            slide,
            on: [0x90 /* ToDo channel */, note, velocity],
            off: [0x80 /* ToDo channel */, note, 0],
        };
    };
}

export function sendNoteActionToWorker(
    type: ActionWorkerNote,
    sequence: SequenceData,
    note: Note,
) {
    const msg: MsgWorker = {
        type,
        note: getNote(sequence)(note),
    };
    worker.postMessage(msg);
}

export function sendSequenceActionToWorker(
    type: ActionWorkerSequence,
    sequence: SequenceData,
) {
    // console.log('sendActionToWorker', sequence);
    // ToDo: here need to activate sequence in track... but for the moment just push to midi
    const notes: NoteInWorker[] = sequence.notes.map(getNote(sequence));
    const msg: MsgWorker = {
        type,
        notes,
    };
    worker.postMessage(msg);
}
