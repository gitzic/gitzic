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
        document.getElementById('eye-off').style.display = 'none';
        document.getElementById('eye-on').style.display = 'inline';
    } else {
        elGithubToken.setAttribute('type', 'password');
        document.getElementById('eye-off').style.display = 'inline';
        document.getElementById('eye-on').style.display = 'none';
    }
}
