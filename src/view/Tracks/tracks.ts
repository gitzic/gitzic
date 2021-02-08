import { tracks, activeTrack } from '../../Zic/track';
import { addListenerSeqChange, sequences } from '../../Zic/sequence';
import { elById } from '../../utils/dom';

export function initTracks() {
    addListenerSeqChange(displaySequences);
}

function displaySequences() {
    const elTracks = elById('tracks');
    elTracks.innerHTML = '';
    tracks[activeTrack].availableSequences.forEach((sequenceId) => {
        const seq = sequences[sequenceId];
        // console.log('name', name);
        elTracks.innerHTML += `<div>${sequenceId}: ${seq?.name}</div>`;
    });
}
