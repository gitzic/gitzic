import { applyToChild, elByClass, elById } from '../utils/dom';
import { onSequenceChangeValue } from '../Zic';
import { getDataId } from './Components/Sequence';
import { initOutputs } from './Outputs/outputs';
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

function showSessionTab() {
    showTab(getTab());
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
    initOutputs();
}

window.addEventListener('popstate', showSessionTab);
// window.history.pushState({ tabId: btnIndex }, `tab ${btnIndex}`, '/url/hello');

onSequenceChangeValue(({ sequence, key }) => {
    const selector = `[data-id="${getDataId(sequence.id)}"] .${key}`;
    const elements = document.querySelectorAll(selector);
    Array.from(elements).forEach((el) => (el.textContent = sequence[key]));
});
