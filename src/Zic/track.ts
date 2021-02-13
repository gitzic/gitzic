import { ActionWorker } from '../interface';
import { sendSequenceActionToWorker } from './clientWorker';
import { SequenceData } from './sequence';

export function stopSequence(sequence: SequenceData) {
    sendSequenceActionToWorker(ActionWorker.remove, sequence);
}

export function activateSequence(sequence: SequenceData) {
    sendSequenceActionToWorker(ActionWorker.save, sequence);
}

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
            // ToDo: here put real id -> string uuid
            { id: 0, outputId: 'yoyo' },
            { id: 1, outputId: 'yoyo' },
            { id: 2, outputId: 'yoyo' },
            { id: 3, outputId: 'yoyo' },
            { id: 4, outputId: 'yoyo' },
            { id: 5, outputId: 'yoyo' },
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
