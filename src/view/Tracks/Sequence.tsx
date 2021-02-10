import { React as fix, ElementNode } from 'async-jsx-html';
import { SequenceData } from '../../Zic/sequence';

const React = fix;

export function Sequence({ name }: SequenceData): ElementNode {
    return (
        <div class="sequence">
            <div>
                <b>{name}</b>
            </div>
            <div class="notes">
                <div>C4</div>
                <div>A4</div>
                <div>C#4</div>
            </div>
        </div>
    );
}
