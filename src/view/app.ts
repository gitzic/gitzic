import { applyToChild, elByClass, elById } from '../utils/dom';
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

function getTab() {
    return (
        window.history.state?.tabId ||
        Number(sessionStorage.getItem('activeTab')) ||
        0
    );
}

// function getModal() {
//     return window.history.state?.modal || sessionStorage.getItem('modal');
// }

function showSessionTab() {
    showTab(getTab());
    // hide all modal
    Array.from(elByClass('modal')).forEach((el) => el.classList.add('hide'));
    // const modal = getModal();
    // if (modal) {
    //     elById(modal).classList.remove('hide');
    // }
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

export function toggleModal(modal: string) {
    // toggle return false when hide is removed
    if (!elById(modal).classList.toggle('hide')) {
        // window.history.pushState({ tabId: getTab(), modal }, '');
        // sessionStorage.setItem('modal', modal);
        return true;
    }
    // window.history.pushState({ tabId: getTab() }, '');
    // sessionStorage.removeItem('modal');
    return false;
}

window.addEventListener('popstate', showSessionTab);
// window.history.pushState({ tabId: btnIndex }, `tab ${btnIndex}`, '/url/hello');
