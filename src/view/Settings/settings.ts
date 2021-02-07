let elGithubUser: HTMLElement;
let elGithubRepo: HTMLElement;
let elGithubToken: HTMLElement;
let elGithubTokenToggle: HTMLElement;

export function initSettings() {
    elGithubUser = document.getElementById('githubUser');
    elGithubRepo = document.getElementById('githubRepo');
    elGithubToken = document.getElementById('githubToken');
    elGithubTokenToggle = document.getElementById('githubTokenToggle');

    elGithubUser.onchange = console.log;
    elGithubRepo.onchange = console.log;
    elGithubToken.onchange = console.log;
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
