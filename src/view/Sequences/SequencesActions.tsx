import { React as fix, ElementNode } from 'async-jsx-html';
const React = fix;

export function SequencesActions(): ElementNode {
    return (
        <div>
            <button id="sequences-reload">Reload</button>
            <button id="sequence-new">New</button>
            <select id="sequence-selector"></select>
            <button class="sequence-edit">Edit</button>
            <button id="sequence-save">Save</button>
        </div>
    );
}
