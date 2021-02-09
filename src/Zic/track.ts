import {
    ActionWorker,
    MsgWorker,
    DataInWorker,
    MAX_STEPS_PER_BEAT,
    DataOutWorker,
} from '../interface';
import { midi } from './midi';
import { SequenceData } from './sequence';

const worker = new Worker('sequencerWorker.ts');

worker.addEventListener(
    'message',
    function ({ data }) {
        // const {  } = data as DataOutWorker;
        midi.outputs.forEach((midiOutput) => {
            midiOutput.send(data.data);
        });
    },
    false,
);

// const msg: MsgWorker = {
//     action: ActionWorker.save,
//     sequences: [
//         { id: '1', trigger: 0, data: [0x90, 50, 90] },
//         { id: '2', trigger: 1, data: [0x80, 50, 0] },
//         { id: '3', trigger: 6, data: [0x90, 60, 90] },
//         { id: '4', trigger: 8, data: [0x80, 60, 0] },
//         { id: '5', trigger: 14, data: [0x90, 70, 90] },
//         { id: '6', trigger: 15, data: [0x80, 70, 0] },
//     ],
// };
// worker.postMessage(msg);

export function activateSequence(sequence: SequenceData) {
    console.log('activateSequence', sequence);
    // ToDo: here need to activate sequence in track... but for the moment just push to midi

    const data: DataInWorker[] = sequence.notes.flatMap(
        ({ velocity, midi: note, duration, time, slide }) => {
            return {
                id: `midi-${sequence.id}-${note}-${time}`,
                outputId: 'td3', // ToDo: to be defined
                trigger: time * MAX_STEPS_PER_BEAT,
                duration: duration * MAX_STEPS_PER_BEAT,
                slide,
                on: [0x90 /* ToDo channel */, note, velocity],
                off: [0x80 /* ToDo channel */, note, 0],
            };
        },
    );

    const msg: MsgWorker = {
        action: ActionWorker.save,
        data,
    };
    worker.postMessage(msg);
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
