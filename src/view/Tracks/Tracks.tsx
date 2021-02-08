import { React as fix, ElementNode } from 'async-jsx-html';

const React = fix;

export function Tracks(): ElementNode {
    return <div id="tracks">
        <div id="track"></div>
    </div>;
}
