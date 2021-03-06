import { MidiMsg } from '../interface';
import { GitHubStorage } from '../storage/GitHubStorage';
import { loadSample, playSample } from './audio';
import { midi } from './midi';

const gitHubStorage = new GitHubStorage();

let samples = {};

async function loadSamples() {
    const dir = await gitHubStorage.readdir('samples');
    dir.forEach((file) => {
        console.log('load sample', file);
        const sampler = loadSample(file);
        const key = file.replace(/\.[^/.]+$/, '');
        samples[key] = {
            send: (msg: MidiMsg, duration: number) =>
                playSample(sampler)(msg, duration),
        };
    });
    // ToDo: emit there for output view
}
loadSamples();

export function getOutput() {
    const outputs = Array.from(midi?.outputs.values() || []);
    const td3 = outputs.find(({ name }) => name.startsWith('TD-3'));
    const neutron = outputs.find(({ name }) => name.startsWith('Neutron'));
    return {
        td3: {
            channel: 0,
            send: td3
                ? /* ToDo apply channel to Midi msg */
                  (msg: MidiMsg, duration?: number, time?: number) => td3.send(msg, time)
                : (msg: MidiMsg) =>
                      console.log('td3 not available to send:', msg),
        },
        neutron: {
            channel: 0,
            send: neutron
                ? /* ToDo apply channel to Midi msg */
                  (msg: MidiMsg, duration?: number, time?: number) => neutron.send(msg, time)
                : (msg: MidiMsg) =>
                      console.log('neutron not available to send:', msg),
        },
        ...samples,
    };
}
