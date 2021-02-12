import { React as fix, ElementNode } from 'async-jsx-html';

const React = fix;

export function Outputs(): ElementNode {
    return (
        <div id="outputs">
            <div>
                <select id="outputs-selector"></select>
            </div>
            <div id="output"></div>
        </div>
    );
}
