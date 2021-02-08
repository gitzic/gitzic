import { React as fix, ElementNode } from 'async-jsx-html';
import { SequenceData } from '../../Zic/sequence';

const React = fix;

export function Sequence({ name }: SequenceData): ElementNode {
    return (
        <div class="sequence">
            {name}
        </div>
    );
}
