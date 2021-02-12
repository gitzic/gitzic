import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

export function SequenceEdit(): ElementNode {
    return (
        <div id="sequence-edit-modal" class="modal hide">
            <div class="modal-body">
                <div>
                    <label>Name</label>
                    <input
                        id="sequence-name"
                        placeholder="Enter sequence name"
                    />
                </div>
                <div>
                    <select>
                        {[...new Array(16)].map((_, key) => (
                            <option key={`beat-${key}`}>{key + 1}</option>
                        ))}
                    </select>
                    beats of
                    <select>
                        {/* {listStepsPerbeat.map((val) => (
                            <option key={`stepsPerBeat${val}`}>{val}</option>
                        ))} */}
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
