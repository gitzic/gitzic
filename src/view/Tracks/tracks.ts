import { tracks, activeTrack } from '../../Zic/track';
import { elById } from '../../utils/dom';
import { onSequenceAdd, onSequencesChange } from '../../Zic';
import { SequenceData } from '../../Zic/sequence';
import { Track } from './Track';

export function initTracks() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequence);
}

function displaySequences(sequences: SequenceData[]) {
    elById('tracks').innerHTML = '';
    tracks[activeTrack].availableSequences.forEach((sequenceId) => {
        addSequence(sequences[sequenceId]);
    });
}

async function addSequence(sequence: SequenceData) {
    const html = await Track(sequence).render();
    // should first check if sequence is already in, else replace
    elById('tracks').innerHTML += html;
}
