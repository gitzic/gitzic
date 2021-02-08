interface AvailableSequence {
    id: number;
    outputId: string;
    active?: boolean;
}

export interface Track {
    sequences: AvailableSequence[];
}

// export const defaultTracks = [{ sequences: [] }];
export const defaultTracks = [
    {
        sequences: [
            { id: 0, outputId: 'yoyo' },
            { id: 1, outputId: 'yoyo' },
            { id: 2, outputId: 'yoyo' },
            { id: 3, outputId: 'yoyo' },
            { id: 4, outputId: 'yoyo' },
        ],
    },
];

export const tracks: Track[] = defaultTracks;
export const activeTrack = 0;

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
