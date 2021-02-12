import { Sampler, Frequency } from 'tone';
import { MidiMsg } from '../interface';

export const DEFAULT_SAMPLE_NOTE = 'C4'; //60; // C4

export function loadSample(file: string) {
    const sampler = new Sampler({
        urls: {
            [DEFAULT_SAMPLE_NOTE]: file,
        },
        baseUrl: 'https://raw.githubusercontent.com/apiel/zic/main/samples/',
    }).toDestination();
    return sampler;
}

export function playSample(sampler: Sampler) {
    return ([cmd, note, velocity]: MidiMsg, duration: number) => {
        if (cmd === 0x90) {
            sampler.triggerAttackRelease(
                [Frequency(note, 'midi').toFrequency()],
                duration,
                undefined,
                velocity / 127,
            );
        }
    };
}
