import { tracks, activeTrack } from '../../Zic/track';
import { sequences } from '../../Zic/sequence';
import { elById } from '../../utils/dom';

export function initTracks() {
    const elTracks = elById('tracks');
    tracks[activeTrack].availableSequences.forEach((sequenceId) => {
        const seq = sequences[sequenceId];
        // console.log('name', name);
        elTracks.innerHTML += `<div>${sequenceId}: ${seq?.name}</div>`;
    });
}
