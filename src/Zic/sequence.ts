import { uuid } from '../utils/utils';
import {
    emitSequencesChange,
    emitSequenceAdd,
    emitSequenceChange,
} from './event';

export interface SequenceData {
    id: string;
    name: string;
    outputId: string;
    outputChannel: number;
    beatCount: number;
    stepsPerBeat: number;
    displayedNotes: number[];
    notes: Note[];
    currentStep: number;
}

export interface Note {
    midi: number;
    duration: number;
    time: number;
    velocity: number;
    slide?: boolean;
}

// export function setNote(id: number, note: Note) {
//     // when note change if duration reduce, need to check if it is not currently on, if yes need to off
//     const index = findIndexNote(id, note);
//     if (index === -1) {
//         sequences[id].notes.push(note);
//     } else if (!note.duration) {
//         // console.log('delete', sequences[id].notes[index]);
//         sequences[id].notes.splice(index, 1);
//     } else {
//         sequences[id].notes[index] = note;
//     }
//     sequences[id].notes.sort((a, b) => a.time - b.time);
//     // console.log('note', note);
//     // console.log('sequences', sequences);
//     // event.emit(eventKey.onSeqChange, sequences);
// }

export function addNote(sequence: SequenceData, note: Note) {
    const sequenceIndex = sequences.findIndex(({ id }) => sequence.id === id);
    sequences[sequenceIndex].notes.push(note);
    sequences[sequenceIndex].notes.sort((a, b) => a.time - b.time);
    emitSequenceChange(sequences[sequenceIndex]);
}

export function setSequences(newSequences: SequenceData[]) {
    sequences = newSequences;
    emitSequencesChange(sequences);
}

export function addNew() {
    const sequence = {
        id: uuid(),
        name: new Date().toLocaleString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
        }),
        outputId: '',
        outputChannel: 0,
        currentStep: 0,
        beatCount: 4,
        stepsPerBeat: 4,
        displayedNotes: [],
        notes: [],
    };
    sequences.push(sequence);
    emitSequenceAdd(sequence);
}

export let sequences: SequenceData[] = [];

export function initSequences() {
    !sequences.length && addNew();
}
