import {
    elByClass,
    elById,
    evEach,
    evStrVal,
    inputById,
} from '../../utils/dom';
import { getOutput } from '../../Zic/output';
import { setOutput, setName } from '../../Zic/sequence';
import { activeSequence } from './sequences';

export function initSequenceEditModal() {
    evEach(elByClass('sequence-edit'), 'click', toggleModalEdit);

    elById('sequence-edit-modal-output').onchange = evStrVal((output) => {
        setOutput(activeSequence, output);
    });

    elById('sequence-edit-modal-name').onchange = evStrVal((name) => {
        setName(activeSequence, name);
    });
}

function toggleModalEdit() {
    // toggle return false when hide is removed
    if (!elById('sequence-edit-modal').classList.toggle('hide')) {
        const outputs = Object.keys(getOutput());
        elById('sequence-edit-modal-output').innerHTML = outputs
            .map((id) => `<option value="${id}">${id}</option>`)
            .join('');
        inputById('sequence-edit-modal-output').value = activeSequence.outputId;

        inputById('sequence-edit-modal-name').value = activeSequence.name;
        inputById(
            'sequence-edit-modal-beat',
        ).value = activeSequence.beatCount.toString();
        inputById(
            'sequence-edit-modal-steps',
        ).value = activeSequence.stepsPerBeat.toString();

        // here we should save changes
    }
}
