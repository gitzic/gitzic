import { React as fix, ElementNode } from 'async-jsx-html';

const React = fix;

export function Outputs(): ElementNode {
    return <div id="outputs">
        <div id="outputs"></div>
    </div>;
}
