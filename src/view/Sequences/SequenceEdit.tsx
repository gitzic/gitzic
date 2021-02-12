import { React as fix, ElementNode } from 'async-jsx-html';
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

export function SequenceEdit(): ElementNode {
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
