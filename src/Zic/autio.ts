const audioContext = new AudioContext();

export const DEFAULT_SAMPLE_NOTE = 60; // C4

export function loadSample(url: string) {
    return fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => audioContext.decodeAudioData(buffer));
}

export function playSample(sample: AudioBuffer) {
    return (
        [cmd, note, velocity]: [number, number, number],
        sampleNote = DEFAULT_SAMPLE_NOTE,
    ) => {
        console.log('cmd sample', cmd);
        if (cmd === 0x90) {
            const source = audioContext.createBufferSource();
            source.buffer = sample;
            if (note !== sampleNote) {
                source.playbackRate.value = 2 ** ((note - sampleNote) / 12);
            }
            // this.gainNode.gain.value = velocity² / 127²
            source.connect(audioContext.destination);
            source.start(0);
            // could schedule the stop
        }
    };
}
