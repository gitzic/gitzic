import { applyToChild, elById, toggleSiblingClass } from '../utils/dom';
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
    elById('tabs-menu').children[0].classList.add('active');
    showTab(0);

    applyToChild(elById('tabs-menu'), (btn, btnIndex) => {
        btn.onclick = () => {
            toggleSiblingClass(btn, 'active');
            showTab(btnIndex);
        };
    });
    
    initSettings();
    initTracks();
}
