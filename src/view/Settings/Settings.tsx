import { React as fix, ElementNode } from 'async-jsx-html';
import { EyeOffOutline } from '../../icons/eye-off-outline';
import { EyeOutline } from '../../icons/eye-outline';
import { GithubTokenInfo } from './GithubTokenInfo';
import {
    getGithubRepo,
    getGithubToken,
    getGithubUser,
} from '../../storage/localStorage';

const React = fix;

export function Settings(): ElementNode {
    return (
        <div>
            <div>
                <label>Github user</label>
                <input
                    id="githubUser"
                    value={getGithubUser()}
                    placeholder="Enter github user"
                />
            </div>
            <div>
                <label>Github repo</label>
                <input
                    id="githubRepo"
                    value={getGithubRepo()}
                    placeholder="Enter github repo"
                />
            </div>
            <div>
                <label>Github token</label>
                <input
                    id="githubToken"
                    type="password"
                    value={getGithubToken()}
                    placeholder="Enter github token"
                />
                <button id="githubTokenToggle">
                    <EyeOffOutline class="icon" id="eye-off" />
                    <EyeOutline class="icon hide" id="eye-on" />
                </button>
            </div>
            <GithubTokenInfo />
        </div>
    );
}
