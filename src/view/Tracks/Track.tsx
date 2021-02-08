import { React as fix, ElementNode } from 'async-jsx-html';
import { SequenceData } from '../../Zic/sequence';

const React = fix;

export function Track({ name }: SequenceData): ElementNode {
    return (
        <div class="track">
            {name}
        </div>
    );
}
