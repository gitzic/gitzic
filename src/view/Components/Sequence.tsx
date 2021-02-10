import { React as fix, ElementNode } from 'async-jsx-html';
import { noteMidi } from '../../utils/noteMidi';
import { SequenceData } from '../../Zic/sequence';

const React = fix;

interface Props {
    noteWidth: number;
    noteMargin: number;
    noteBorder?: number;
    sequence: SequenceData;
}

export function Sequence({
    noteWidth,
    noteMargin,
    noteBorder = 0,
    sequence: { name, notes, beatCount, stepsPerBeat },
}: Props): ElementNode {
    return (
        <div class="sequence card">
            <div class="title">{name}</div>
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
                    const note = notes.find(
                        ({ time }) => time * stepsPerBeat === key,
                    );
                    const duration = note ? note.duration * stepsPerBeat : 1;
                    return (
                        <div
                            class={`${note?.slide && 'slide'}`}
                            style={`width: ${
                                noteWidth * duration +
                                (2+ noteMargin + noteBorder * 2) * (duration - 1)
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
