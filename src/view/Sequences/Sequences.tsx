import { React as fix, ElementNode } from 'async-jsx-html';
import { SequenceEdit } from './SequenceEdit';
const React = fix;

export function Sequences(): ElementNode {
    return (
        <div>
            <div>
                <button id="sequences-reload">Reload</button>
                <button id="sequence-new">New</button>
                <select id="sequence-selector"></select>
                <button class="sequence-edit">Edit</button>
                <button id="sequence-save">Save</button>
            </div>
            <div id="sequence-edit-notes"></div>
            <SequenceEdit />
        </div>
    );
}
