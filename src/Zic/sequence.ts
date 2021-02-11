import { ActionWorker, MsgWorker } from '../interface';
import { uuid } from '../utils/utils';
import { sendNoteActionToWorker, worker } from './clientWorker';
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

function findNote(sequence: SequenceData, note: Note) {
    const sequenceIndex = sequences.findIndex(({ id }) => sequence.id === id);
    if (sequenceIndex !== -1) {
        const noteIndex = sequences[sequenceIndex].notes.findIndex(
            ({ time }) => time === note.time,
        );
        return noteIndex !== -1 && { note: noteIndex, seq: sequenceIndex };
    }
}

export function removeNote(sequence: SequenceData, note: Note) {
    const index = findNote(sequence, note);
    if (index) {
        sequences[index.seq].notes.splice(index.note, 1);
        emitSequenceChange(sequences[index.seq]);
        sendNoteActionToWorker(ActionWorker.removeNote, sequence, note);
    }
}

export function setNote(sequence: SequenceData, note: Note) {
    const index = findNote(sequence, note);
    if (index) {
        sequences[index.seq].notes[index.note] = note;
        emitSequenceChange(sequences[index.seq]);
        sendNoteActionToWorker(ActionWorker.saveNote, sequence, note);
    }
}

export function addNote(sequence: SequenceData, note: Note) {
    const sequenceIndex = sequences.findIndex(({ id }) => sequence.id === id);
    sequences[sequenceIndex].notes.push(note);
    sequences[sequenceIndex].notes.sort((a, b) => a.time - b.time);
    emitSequenceChange(sequences[sequenceIndex]);
    sendNoteActionToWorker(ActionWorker.saveNote, sequence, note);
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
