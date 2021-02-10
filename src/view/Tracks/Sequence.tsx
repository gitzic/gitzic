import { React as fix, ElementNode } from 'async-jsx-html';
import { MAX_STEPS_PER_BEAT, STEP_TICK } from '../../interface';
import { noteMidi } from '../../utils/noteMidi';
import { SequenceData } from '../../Zic/sequence';

const React = fix;

export function Sequence({
    name,
    notes,
    beatCount,
    stepsPerBeat,
}: SequenceData): ElementNode {
    return (
        <div class="sequence">
            <div>
                <b>{name}</b>
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
                    const note = notes.find(
                        ({ time }) => time * stepsPerBeat === key,
                    );
                    const duration = note ? note.duration * stepsPerBeat : 1;
                    return (
                        <div
                            style={`width: ${
                                16 * duration + 4 * (duration - 1)
                            }px`}
                        >
                            {note && noteMidi[note.midi]}
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
