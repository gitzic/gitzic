import {
    ActionWorker,
    MsgWorker,
    NoteInWorker,
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

function sendActionToWorker(action: ActionWorker, sequence: SequenceData) {
    console.log('sendActionToWorker', sequence);
    // ToDo: here need to activate sequence in track... but for the moment just push to midi

    const notes: NoteInWorker[] = sequence.notes.map(
        ({ velocity, midi: note, duration, time, slide }) => {
            return {
                id: `midi-${sequence.id}-${note}-${time}`,
                // ToDo: we could actually skip all the following for stop note
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
        action,
        notes,
    };
    worker.postMessage(msg);
}

export function stopSequence(sequence: SequenceData) {
    sendActionToWorker(ActionWorker.remove, sequence);
}

export function activateSequence(sequence: SequenceData) {
    sendActionToWorker(ActionWorker.save, sequence);
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
