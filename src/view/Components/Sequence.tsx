import { React as fix, ElementNode } from 'async-jsx-html';
import { join } from '../../utils/dom';
import { noteMidi } from '../../utils/noteMidi';
import { Note, SequenceData } from '../../Zic/sequence';
import { findNote } from '../Sequences/sequences';

const React = fix;

export function getDataId(id: string) {
    return `sequence-${id}`;
}

interface Props {
    noteWidth: number;
    noteMargin: number;
    noteBorder?: number;
    sequence: SequenceData;
    selectedNote?: Note;
}

export function Sequence({
    noteWidth,
    noteMargin,
    noteBorder = 0,
    sequence,
    selectedNote,
}: Props): ElementNode {
    const { name, notes, beatCount, stepsPerBeat, outputId, id } = sequence;
    return (
        <div class="sequence card" data-id={getDataId(id)}>
            <div class="title">
                <span class="name">{name}</span>{' '}
                <i class="outputId">{outputId}</i>
            </div>
            <div class="notes">
                {[...new Array(beatCount * stepsPerBeat)].map((_, key) => {
                    const longNote = notes.find(
                        ({ time, duration }) =>
                            key > time * stepsPerBeat &&
                            key < (time + duration) * stepsPerBeat,
                    );
                    if (longNote) {
                        return;
                    }
                    const note = findNote(sequence, key);
                    const duration = note ? note.duration * stepsPerBeat : 1;
                    return (
                        <div
                            data-key={key}
                            class={join([
                                'note',
                                note?.slide && 'slide',
                                selectedNote &&
                                    selectedNote === note &&
                                    'selected',
                            ])}
                            style={`width: ${
                                noteWidth * duration +
                                (2 + noteMargin + noteBorder * 2) *
                                    (duration - 1)
                            }px`}
                        >
                            <div class="step">{key + 1}</div>
                            <div class="note-name">
                                {note && noteMidi[note.midi]}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div class="time">
                <b>{beatCount * stepsPerBeat}</b> steps / {beatCount} beats
            </div>
        </div>
    );
}
