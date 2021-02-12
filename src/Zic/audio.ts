import { MidiMsg } from "../interface";

const audioContext = new AudioContext();

export const DEFAULT_SAMPLE_NOTE = 60; // C4

export function loadSample(url: string) {
    return fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer));
}

// should use https://tonejs.github.io/docs/14.7.77/Sampler.html instead
export function playSample(sample: AudioBuffer) {
    return (
        [cmd, note, velocity]: MidiMsg,
        duration: number,
        sampleNote = DEFAULT_SAMPLE_NOTE,
    ) => {
        if (cmd === 0x90) {
            const source = audioContext.createBufferSource();
            source.buffer = sample;
            if (note !== sampleNote) {
                source.playbackRate.value = 2 ** ((note - sampleNote) / 12);
            }
            // this.gainNode.gain.value = velocity² / 127²
            source.connect(audioContext.destination);
            source.start(0);
            source.stop(duration);
            // could schedule the stop
        }
    };
}
