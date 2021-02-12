import { elById, inputById } from '../../utils/dom';
import { getOutput } from '../../Zic/output';

let selectedOutput: string;

export function initOutputs() {
    displaySelector();
}

function displaySelector() {
    const outputs = Object.keys(getOutput());
    selectedOutput = outputs[0];

    elById('outputs-selector').innerHTML = outputs
        .map((id) => `<option value="${id}">${id}</option>`)
        .join('');
    inputById('outputs-selector').value = selectedOutput;
}
