import { loadSample, playSample } from './autio';
import { midi } from './midi';

const samples = {
    psykick1: {
        url:
            'https://raw.githubusercontent.com/apiel/zic/main/samples/psykick-01.wav',
        send: (data: any) => console.log('sample not loaded:', data),
    },
};

for (const key in samples) {
    console.log('load sample', key);
    loadSample(samples[key].url).then(
        (sample) => {
            samples[key].send = (data: any) => playSample(sample)(data);
            console.log('sample loaded', samples[key].url);
        }
    );
}

export function getOutput() {
    const outputs = Array.from(midi?.outputs.values() || []);
    const td3 = outputs.find(({ name }) => name.startsWith('TD-3'));
    return {
        td3: {
            channel: 0,
            send: td3
                ? (data: any) => td3.send(data)
                : (data: any) =>
                      console.log('td3 not available to send:', data),
        },
        ...samples,
    };
}
