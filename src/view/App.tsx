import { React as fix, ElementNode } from 'async-jsx-html';
import { Settings } from './Settings/Settings';
import { Tracks } from './Tracks/Tracks';
const React = fix;

export function App(): ElementNode {
    return (
        <>
            <div id="tabs-views">
                <Tracks />
                <div>sequences</div>
                <Settings />
            </div>
            <div id="tabs-menu">
                <button>Tracks</button>
                <button>Sequences</button>
                <button>Settings</button>
            </div>
        </>
    );
}
