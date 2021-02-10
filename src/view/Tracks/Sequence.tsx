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
                    const slide = notes.find(
                        ({ time, duration }) =>
                            key > time * stepsPerBeat &&
                            key < (time + duration) * stepsPerBeat,
                    );
                    if (slide) {
                        return;
                    }
                    const note = notes.find(
                        ({ time }) => time * stepsPerBeat === key,
                    );
                    const duration = note ? note.duration * stepsPerBeat : 1;
                    return (
                        <div
                            className={`step ${note && 'active'} ${
                                note?.slide && 'slide'
                            }`}
                            style={{
                                width: 30 * duration + 4 * (duration - 1),
                            }}
                        >{note && noteMidi[note.midi]}</div>
                    );
                })}
            </div>
        </div>
    );
}
