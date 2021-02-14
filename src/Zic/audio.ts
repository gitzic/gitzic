import * as Tone from 'tone';
import { Sampler, Frequency, Transport } from 'tone';
import { MidiMsg } from '../interface';
import { getGithubRepo, getGithubUser } from '../storage/localStorage';
import { getOutput } from './output';

export const DEFAULT_SAMPLE_NOTE = 'C4'; //60; // C4

export function loadSample(file: string) {
    const sampler = new Sampler({
        urls: {
            [DEFAULT_SAMPLE_NOTE]: file,
        },
        baseUrl: `https://raw.githubusercontent.com/${getGithubUser()}/${getGithubRepo()}/main/samples/`,
    }).toDestination();
    return sampler;
}

export function playSample(sampler: Sampler) {
    return (
        [cmd, note, velocity]: MidiMsg,
        duration: number,
        time?: number,
    ) => {
        if (cmd === 0x90) {
            sampler.triggerAttackRelease(
                [Frequency(note, 'midi').toFrequency()],
                duration / 1000,
                time,
                velocity / 127,
            );
        }
    };
}

// var audioContext = new AudioContext();
// Transport.scheduleRepeat(function (time) {
//     // getOutput()['td3'].send([0x90, 60, 100]);
//     // var timingOffset = 0;
//     // var timingOffset = 100;
//     // console.log(`perf ${(performance.now()/1000)} tonenow ${Tone.now()} calc ${(performance.now()/1000) - Tone.now()} time ${time} all ${performance.now() - Tone.now() - time}`);
//     // var timingOffset = (performance.now()/1000) - Tone.now();
//     var timingOffset = (performance.now()/1000) - audioContext.currentTime;
//     // var timingOffset = (Tone.now()- time) * 1000;
//     console.log(time);
//     getOutput()['td3'].send([0x90, 60, 100], timingOffset);
//     getOutput()['td3'].send([0x80, 60, 0], timingOffset + 200);
//     getOutput()['psykick1'].send([0x90, 60, 100], '2n', time);
//     // getOutput()['psykick1'].send([0x90, 60, 100], '2n', Tone.now());
//     // getOutput()['psykick1'].send([0x90, 60, 100], "2n", Tone.immediate());
// }, '1n');

// Transport.start();
// Tone.start();

// Transport.scheduleRepeat(function (time) {
//     // getOutput()['td3'].send([0x90, 60, 100]);
//     // var timingOffset = 0;
//     // var timingOffset = 100;
//     var timingOffset = (Tone.now()- time) * 1000;
//     console.log(time);
//     setTimeout(() => getOutput()['td3'].send([0x90, 60, 100]), timingOffset);
//     setTimeout(
//         () => getOutput()['td3'].send([0x80, 60, 0]),
//         timingOffset + 200,
//     );
//     getOutput()['psykick1'].send([0x90, 60, 100], '2n', Tone.now());
//     // getOutput()['psykick1'].send([0x90, 60, 100], "2n", Tone.immediate());
// }, '1n');

// Transport.scheduleRepeat(function(time){
//     getOutput()['td3'].send([0x90, 60, 100]);
//     setTimeout(() => getOutput()['td3'].send([0x80, 60, 100]), 500);
//     // getOutput()['psykick1'].send([0x90, 60, 100]);
// }, "1n");

// Transport.scheduleRepeat(function(time){
// 	//do something with the time
//     console.log('scheduleRepeat2', time);
// }, "2n");
