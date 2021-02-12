import { MidiMsg } from '../interface';
import { loadSample, playSample } from './audio';
import { midi } from './midi';

const samples = {
    psykick1: {
        url:
            'https://raw.githubusercontent.com/apiel/zic/main/samples/psykick-01.wav',
        send: (msg: MidiMsg) => console.log('sample not loaded:', msg),
    },
};

for (const key in samples) {
    console.log('load sample', key);
    // loadSample(samples[key].url).then((sample) => {
    //     samples[key].send = (msg: MidiMsg, duration: number) =>
    //         playSample(sample)(msg, duration);
    //     console.log('sample loaded', samples[key].url);
    // });
    const sampler = loadSample(samples[key].url);
    samples[key].send = (msg: MidiMsg, duration: number) =>
        playSample(sampler)(msg, duration);
}

export function getOutput() {
    const outputs = Array.from(midi?.outputs.values() || []);
    const td3 = outputs.find(({ name }) => name.startsWith('TD-3'));
    return {
        td3: {
            channel: 0,
            send: td3
                ? /* ToDo apply channel to Midi msg */
                  (msg: MidiMsg) => td3.send(msg)
                : (msg: MidiMsg) =>
                      console.log('td3 not available to send:', msg),
        },
        ...samples,
    };
}
