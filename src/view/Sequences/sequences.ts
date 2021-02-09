import { loadSequences, saveSequences } from '../../git';
import { elById, elFromHtml } from '../../utils/dom';
import { onSequenceAdd, onSequencesChange } from '../../Zic';
import { SequenceData } from '../../Zic/sequence';

export function initSequences() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequenceItem);
    elById('sequences-reload').onclick = btnLoading(loadSequences);
    // ToDo: in a later point we might save a single sequence
    elById('sequence-save').onclick = btnLoading(saveSequences, 'Saving');
}

function btnLoading(fn: () => Promise<void>, text = 'Loading') {
    return async (ev: Event) => {
        const el = ev.target as HTMLElement;
        const current = el.innerText;
        el.innerText = text;
        await fn();
        el.innerText = current;
    };
}

function displaySequences(sequences: SequenceData[]) {
    elById('sequence-selector').innerHTML = '';
    sequences.forEach(addSequenceItem);
}

async function addSequenceItem({ id, name }: SequenceData) {
    elById('sequence-selector').append(
        elFromHtml(`<option value="${id}">${name}</option>`),
    );
}
