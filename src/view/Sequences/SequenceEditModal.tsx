import { React as fix, ElementNode } from 'async-jsx-html';
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
import { MAX_STEPS_PER_BEAT } from '../../interface';
const React = fix;

const listStepsPerbeat = getListStepsPerbeat();

function getListStepsPerbeat(val = MAX_STEPS_PER_BEAT) {
    const list = [1];
    for (; val > 1; val = val / 2) {
        list.push(val);
    }
    return list.sort();
}

export function SequenceEditModal(): ElementNode {
    return (
        <div id="sequence-edit-modal" class="modal hide">
            <div class="modal-body">
                <div>
                    <label>Name</label>
                    <input
                        id="sequence-edit-modal-name"
                        placeholder="Enter sequence name"
                    />
                </div>
                <div>
                    <select id="sequence-edit-modal-beat">
                        {[...new Array(16)].map((_, key) => (
                            <option key={`beat-${key}`}>{key + 1}</option>
                        ))}
                    </select>
                    beats of
                    <select id="sequence-edit-modal-steps">
                        {listStepsPerbeat.map((val) => (
                            <option key={`stepsPerBeat${val}`}>{val}</option>
                        ))}
                    </select>
                    steps.
                </div>
                <div>
                    Output: <select id="sequence-edit-modal-output"></select>
                </div>
            </div>
            <div class="tabs">
                <button class="sequence-edit">Ok</button>
            </div>
        </div>
    );
}

export function initSequenceEditModal() {
    evEach(elByClass('sequence-edit'), 'click', toggleModalEdit);

    elById('sequence-edit-modal-output').onchange = evStrVal((output) => {
        setOutput(activeSequence, output);
    });

    elById('sequence-edit-modal-name').onchange = evStrVal((name) => {
        setName(activeSequence, name);
    });

    // ToDo: setBeat and setSteps this might have impact on sequence layout
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
