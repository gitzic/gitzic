import { React as fix } from 'async-jsx-html';
const React = fix;

export const GithubTokenInfo = () => {
    return (
        <div class="info">
            <p>
                To save data in your GitHub repository, we need to provide a{' '}
                <a
                    href="https://developer.github.com/v3/auth/#via-oauth-and-personal-access-tokens"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    personal access tokens
                </a>{' '}
                to the{' '}
                <a
                    href="https://developer.github.com/v3/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    GitHub API
                </a>
                . To{' '}
                <a
                    href="https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    create a token
                </a>
                , go in developer settings, personal access tokens and then
                generate new token. In most of the case you will only need to
                give permission for public_repo.
            </p>
        </div>
    );
};
