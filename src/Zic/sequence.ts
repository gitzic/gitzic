import { uuid } from '../utils/utils';
import { emitSequencesChange, emitSequenceAdd } from './event';

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

export function getCurrentNotes(id: number) {
    return sequences[id].notes
        .filter((note) => isNoteOn(id, note) || isNoteOff(id, note))
        .sort((_, note) => (isNoteOff(id, note) && note.slide ? -1 : 1));
}

export function isNoteOn(id: number, { time }: Note) {
    return sequences[id].currentStep === time;
}

export function isNoteOff(id: number, { time, duration }: Note) {
    return (
        time + duration === sequences[id].currentStep ||
        (sequences[id].currentStep === 0 &&
            time + duration === sequences[id].beatCount)
    );
}

export function findIndexNote(id: number, note: Note) {
    return sequences[id].notes.findIndex(
        ({ time, midi }) => note.time === time && note.midi === midi,
    );
}

export function setOutputId(id: number) {
    return (outputId: string) => {
        sequences[id].outputId = outputId;
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setOutputChannel(id: number) {
    return (channel: number) => {
        sequences[id].outputChannel = channel;
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setBeatCount(id: number) {
    return (count: number) => {
        sequences[id].beatCount = count;
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setStepsPerBeat(id: number) {
    return (count: number) => {
        sequences[id].stepsPerBeat = count;
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setName(id: number) {
    return (name: string) => {
        sequences[id].name = name;
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setNote(id: number) {
    return (note: Note) => {
        // when note change if duration reduce, need to check if it is not currently on, if yes need to off
        const index = findIndexNote(id, note);
        if (index === -1) {
            sequences[id].notes.push(note);
        } else if (!note.duration) {
            // console.log('delete', sequences[id].notes[index]);
            sequences[id].notes.splice(index, 1);
        } else {
            sequences[id].notes[index] = note;
        }
        sequences[id].notes.sort((a, b) => a.time - b.time);
        // console.log('note', note);
        // console.log('sequences', sequences);
        // event.emit(eventKey.onSeqChange, sequences);
    };
}

export function setDisplayNote(id: number) {
    return (midi: number) => {
        sequences[id].displayedNotes.push(midi);
        sequences[id].displayedNotes.sort();
    };
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
