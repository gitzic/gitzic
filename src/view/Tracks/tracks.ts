import { tracks, activeTrack } from '../../Zic/track';
import { elById } from '../../utils/dom';
import { onSequenceChange, onSequencesChange } from '../../Zic';
import { SequenceData } from '../../Zic/sequence';

export function initTracks() {
    onSequencesChange(displaySequences);
    onSequenceChange(displaySequence);
}

function displaySequences(sequences: SequenceData[]) {
    elById('tracks').innerHTML = '';
    tracks[activeTrack].availableSequences.forEach((sequenceId) => {
        displaySequence(sequences[sequenceId]);
    });
}

function displaySequence({name}: SequenceData) {
    // should first check if sequence is already in, else replace
    elById('tracks').innerHTML += `<div>${name}</div>`;
}
