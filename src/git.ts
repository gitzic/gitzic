import { GitHubStorage } from './storage/GitHubStorage';
import { join } from 'path';
import { sequences, setSequences } from './Zic/sequence';

const gitHubStorage = new GitHubStorage();

export async function loadSequences() {
    const sequences = await gitHubStorage.readJSON(
        join('sequences', 'sequences.json'),
    );
    if (sequences && Array.isArray(sequences)) {
        setSequences(sequences);
    }
}

export function saveSequences() {
    return gitHubStorage.saveJSON(
        join('sequences', 'sequences.json'),
        sequences,
    );
}
