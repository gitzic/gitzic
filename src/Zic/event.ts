import EventEmitter from 'eventemitter3';
import { SequenceData } from './sequence';

export const event = new EventEmitter();

export enum eventKey {
    onMIDISuccess = 'onMIDISuccess',
    onMIDIError = 'onMIDIError',
    onBPMchange = 'onBPMchange',
    onSequencesChange = 'onSequencesChange',
    onSequenceChange = 'onSequenceChange',
    onTrackChange = 'onTrackChange',
}

export function onSequencesChange(fn: (sequences: SequenceData[]) => void) {
    event.addListener(eventKey.onSequencesChange, fn);
}

export function emitSequencesChange(sequences: SequenceData[]) {
    event.emit(eventKey.onSequencesChange, sequences);
}

export function onSequenceChange(fn: (sequence: SequenceData) => void) {
    event.addListener(eventKey.onSequenceChange, fn);
}

export function emitSequenceChange(sequence: SequenceData) {
    event.emit(eventKey.onSequenceChange, sequence);
}
