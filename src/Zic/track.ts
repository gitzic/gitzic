import { event, eventKey } from './event';

interface ActiveSequence {
    id: number;
    outputId: string;
}

export interface Track {
    activeSequences: ActiveSequence[];
    availableSequences: number[];
}

// export const defaultTracks = [{ sequences: [] }];
export const defaultTracks = [
    {
        availableSequences: [0, 1, 2, 3, 4],
        activeSequences: [{ id: 0, outputId: 'yoyo' }],
    },
];

export const tracks: Track[] = defaultTracks;
const activeTrack = 0;


// export function addListenerTrackschange(fn: (tracks: Track[]) => void) {
//     event.addListener(eventKey.onTrackChange, fn);
// }

// export function getSequenceInTrack(trackId: number, sequenceId: number) {
//     return tracks[trackId].sequences.findIndex((val) => val === sequenceId);
// }

// export function toggleSequence(trackId: number, sequenceId: number) {
//     const index = getSequenceInTrack(trackId, sequenceId);
//     if (index === -1) {
//         tracks[trackId].sequences.push(sequenceId);
//     } else {
//         tracks[trackId].sequences.splice(index, 1);
//     }
//     event.emit(eventKey.onTrackChange, tracks);
// }
