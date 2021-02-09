import { React as fix, ElementNode } from 'async-jsx-html';
import { Sequences } from './Sequences/Sequences';
import { Settings } from './Settings/Settings';
import { Tracks } from './Tracks/Tracks';
const React = fix;

export function App(): ElementNode {
    return (
        <>
            <div id="tabs-views">
                <Tracks />
                <Sequences />
                <Settings />
            </div>
            <div id="tabs-menu" class="tabs">
                <button>Tracks</button>
                <button>Sequences</button>
                <button>Settings</button>
            </div>
        </>
    );
}
