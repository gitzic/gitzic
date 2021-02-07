import {
    storeGithubRepo,
    storeGithubToken,
    storeGithubUser,
} from '../../storage/localStorage';
import { evStrVal } from '../../utils/event';

let elGithubToken: HTMLElement;
let elGithubTokenToggle: HTMLElement;

export function initSettings() {
    document
        .getElementById('githubUser')
        .addEventListener('change', evStrVal(storeGithubUser));

    document
        .getElementById('githubRepo')
        .addEventListener('change', evStrVal(storeGithubRepo));

    elGithubToken = document.getElementById('githubToken');
    elGithubTokenToggle = document.getElementById('githubTokenToggle');
    elGithubToken.addEventListener('change', evStrVal(storeGithubToken));
    elGithubTokenToggle.onclick = showToken;
}

function showToken() {
    if (elGithubToken.getAttribute('type') === 'password') {
        elGithubToken.setAttribute('type', 'text');
    } else {
        elGithubToken.setAttribute('type', 'password');
    }
    document.getElementById('eye-off').classList.toggle('hide');
    document.getElementById('eye-on').classList.toggle('hide');
}
