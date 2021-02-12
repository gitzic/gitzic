import {
    applyToChild,
    elByClass,
    elById,
    toggleSiblingClass,
} from '../utils/dom';
import { initSequences } from './Sequences/sequences';
import { initSettings } from './Settings/settings';
import { initTracks } from './Tracks/tracks';

function showTab(btnIndex: number) {
    const fn = (tab: HTMLElement, tabIndex: number) => {
        if (btnIndex === tabIndex) {
            tab.classList.add('active');
        } else {
            tab.classList.remove('active');
        }
    };
    applyToChild(elById('tabs-menu'), fn);
    applyToChild(elById('tabs-views'), fn);
}

function showSessionTab(ev?: PopStateEvent) {
    const tab = ev?.state?.tabId || Number(sessionStorage.getItem('activeTab')) || 0;
    showTab(tab);
    // hide all modal
    Array.from(elByClass('modal')).forEach((el) => el.classList.add('hide'));
}

export function initApp() {
    showSessionTab();
    applyToChild(elById('tabs-menu'), (btn, btnIndex) => {
        btn.onclick = () => {
            sessionStorage.setItem('activeTab', btnIndex.toString());
            window.history.pushState({ tabId: btnIndex }, '');
            showTab(btnIndex);
        };
    });

    initSettings();
    initTracks();
    initSequences();
}

window.addEventListener('popstate', showSessionTab);
// window.history.pushState({ tabId: btnIndex }, `tab ${btnIndex}`, '/url/hello');
