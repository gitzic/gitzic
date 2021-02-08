import {
    storeGithubRepo,
    storeGithubToken,
    storeGithubUser,
} from '../../storage/localStorage';
import { elById, evStrVal, toggleAttr, toggleChildClass } from '../../utils/dom';

let elGithubToken: HTMLElement;
let elGithubTokenToggle: HTMLElement;

export function initSettings() {
    // use addEventListener to have multiple subscriber
    //elById('githubUser').addEventListener('change', evStrVal(storeGithubUser));
    elById('githubUser').onchange = evStrVal(storeGithubUser);
    elById('githubRepo').onchange = evStrVal(storeGithubRepo);

    elGithubToken = elById('githubToken');
    elGithubTokenToggle = elById('githubTokenToggle');
    elGithubToken.onchange = evStrVal(storeGithubToken);
    elGithubTokenToggle.onclick = showToken;
}

function showToken() {
    toggleAttr(elGithubToken, 'type', 'password', 'text');
    toggleChildClass(elGithubTokenToggle, 'hide');
}
