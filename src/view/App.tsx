import { React as fix, ElementNode } from 'async-jsx-html';
import { NotesOutline } from '../icons/notes-outline';
import { PlayOutline } from '../icons/play-outline';
import { PulseOutline } from '../icons/pulse-outline';
import { SettingOutline } from '../icons/setting-outline';
import { Outputs } from './Outputs/Outputs';
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
                <Outputs />
                <Settings />
            </div>
            <div id="tabs-menu" class="tabs">
                <button>
                    <PlayOutline />
                    <div>Tracks</div>
                </button>
                <button>
                    <NotesOutline />
                    <div>Sequences</div>
                </button>
                <button>
                    <PulseOutline />
                    <div>Outputs</div>
                </button>
                <button>
                    <SettingOutline />
                    <div>Settings</div>
                </button>
            </div>
        </>
    );
}
