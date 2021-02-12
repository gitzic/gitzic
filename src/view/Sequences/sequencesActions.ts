import { loadSequences, saveSequences } from '../../git';
import { elById } from '../../utils/dom';
import { onSequenceAdd, onSequencesChange, onSequenceChange } from '../../Zic';
import {
    displaySequence,
    displaySequences,
    addSequenceItem,
} from './sequences';
import { activeSequence } from './sequences';

export function initSequencesActions() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequenceItem);
    onSequenceChange(
        (sequence) =>
            sequence.id === activeSequence?.id && displaySequence(sequence),
    );

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
