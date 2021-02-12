import { React as fix, ElementNode } from 'async-jsx-html';
import { SequenceEditModal } from './SequenceEditModal';
import { noteMidi } from '../../utils/noteMidi';
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
            <div id="sequence-edit-note" class="hide">
                note:
                <select id="sequence-edit-note-midi">
                    {noteMidi.map((name, key) => (
                        <option value={key}>{name}</option>
                    ))}
                </select>
                length:
                <select id="sequence-edit-note-length"></select>
                <button id="sequence-edit-note-slide">Slide</button>
                velocity:
                <select id="sequence-edit-note-velocity">
                    {[...new Array(127)].map((_, key) => (
                        <option>{key + 1}</option>
                    ))}
                </select>
            </div>
            <SequenceEditModal />
        </div>
    );
}
