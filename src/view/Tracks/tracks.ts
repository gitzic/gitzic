import { tracks, activeTrack } from '../../Zic/track';
import { elById, elFromHtml } from '../../utils/dom';
import { onSequenceAdd, onSequencesChange } from '../../Zic';
import { SequenceData } from '../../Zic/sequence';
import { Track } from './Track';

export function initTracks() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequence);
}

function displaySequences(sequences: SequenceData[]) {
    elById('tracks').innerHTML = '';
    tracks[activeTrack].sequences.forEach(({ id }) => {
        addSequence(sequences[id]);
    });
}

async function addSequence(sequence: SequenceData) {
    const html = await Track(sequence).render();
    const el = elFromHtml(html as string);
    // should first check if sequence is already in, else replace
    elById('tracks').append(el);
    el.addEventListener('click', () => {
        el.classList.toggle('active');
    });
}