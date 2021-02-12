import { Sampler, Frequency } from 'tone';
import { MidiMsg } from '../interface';

// const audioContext = new AudioContext();

// export const DEFAULT_SAMPLE_NOTE = 60; // C4

// export async function loadSample(url: string) {
//     const response = await fetch(url);
//     const buffer = await response.arrayBuffer();
//     return audioContext.decodeAudioData(buffer);
// }

// // could use https://tonejs.github.io/docs/14.7.77/Sampler.html instead
// // but then sound is very bad!
// export function playSample(sample: AudioBuffer) {
//     return (
//         [cmd, note, velocity]: MidiMsg,
//         duration: number,
//         sampleNote = DEFAULT_SAMPLE_NOTE,
//     ) => {
//         if (cmd === 0x90) {
//             // console.log('play sample');
//             const source = audioContext.createBufferSource();
//             source.buffer = sample;
//             if (note !== sampleNote) {
//                 source.playbackRate.value = 2 ** ((note - sampleNote) / 12);
//             }
//             // this.gainNode.gain.value = velocity² / 127²
//             source.connect(audioContext.destination);
//             source.start(0);
//             source.stop(duration);
//             // could schedule the stop
//         }
//     };
// }

export const DEFAULT_SAMPLE_NOTE = 'C4'; //60; // C4

export function loadSample(file: string) {
    const sampler = new Sampler({
        urls: {
            [DEFAULT_SAMPLE_NOTE]: file,
        },
        // baseUrl: 'https://raw.githubusercontent.com/apiel/zic/main/samples/',
    }).toDestination();
    return sampler;
}

export function playSample(sampler: Sampler) {
    return ([cmd, note, velocity]: MidiMsg, duration: number) => {
        if (cmd === 0x90) {
            sampler.triggerAttackRelease([Frequency(note, 'midi').toFrequency()], duration);
        }
    };
}
