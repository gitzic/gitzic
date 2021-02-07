import { React as fix, ElementNode } from 'async-jsx-html';
import { EyeOffOutline } from '../../icons/eye-off-outline';
import { EyeOutline } from '../../icons/eye-outline';
import { GithubTokenInfo } from './GithubTokenInfo';

const React = fix;

export function Settings(): ElementNode {
    return (
        <div id="settings">
            <div>
                <label>Github user</label>
                <input
                    id="githubUser"
                    value=""
                    placeholder="Enter github user"
                />
            </div>
            <div>
                <label>Github repo</label>
                <input
                    id="githubRepo"
                    value=""
                    placeholder="Enter github repo"
                />
            </div>
            <div>
                <label>Github token</label>
                <input
                    id="githubToken"
                    value=""
                    placeholder="Enter github token"
                />
                <button>
                    <EyeOffOutline style="height: 10px;" id="yoy" />
                    <EyeOutline style="height: 10px;" />
                </button>
            </div>
            <GithubTokenInfo />
        </div>
    );
}
