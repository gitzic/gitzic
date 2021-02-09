import { applyToChild, elById, toggleSiblingClass } from '../utils/dom';
import { initSequences } from './Sequences/sequences';
import { initSettings } from './Settings/settings';
import { initTracks } from './Tracks/tracks';

function showTab(btnIndex: number) {
    applyToChild(elById('tabs-views'), (tab, tabIndex) => {
        if (btnIndex === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    });
}

export function initApp() {
    const tab = Number(sessionStorage.getItem('activeTab')) || 0;
    elById('tabs-menu').children[tab].classList.add('active');
    showTab(tab);

    applyToChild(elById('tabs-menu'), (btn, btnIndex) => {
        btn.onclick = () => {
            sessionStorage.setItem('activeTab', btnIndex.toString());
            toggleSiblingClass(btn, 'active');
            showTab(btnIndex);
        };
    });
    
    initSettings();
    initTracks();
    initSequences();
}
