import {
    tracks,
    activeTrack,
    activateSequence,
    stopSequence,
} from '../../Zic/track';
import { elById, elFromHtml } from '../../utils/dom';
import { onSequenceAdd, onSequencesChange } from '../../Zic';
import { SequenceData } from '../../Zic/sequence';
import { Sequence } from '../Components/Sequence';

export function initTracks() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequence);
}

function displaySequences(sequences: SequenceData[]) {
    elById('track').innerHTML = '';
    tracks[activeTrack].sequences.forEach(({ id }) => {
        // ToDo: here should find by id!
        addSequence(sequences[id]);
    });
}

async function addSequence(sequence: SequenceData) {
    const html = await Sequence({
        sequence,
        noteMargin: 4,
        noteWidth: 16,
    }).render();
    const el = elFromHtml(html as string);
    // ToDo: should first check if sequence is already in, else replace
    elById('track').append(el);
    el.addEventListener('click', () => {
        const active = el.classList.toggle('active');
        if (active) {
            activateSequence(sequence);
        } else {
            stopSequence(sequence);
        }
    });
}
