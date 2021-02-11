export interface Tempo {
    bpm: number;
    ms: number;
}

export interface Sequencer {
    tempo: Tempo;
}

export const sequencer: Sequencer = {
    tempo: {
        bpm: 100,
        ms: 150,
    },
};

export function initSequencer() {
    // setBpm(sequencer.tempo.bpm);
}

// export function setBpm(newBpm: number) {
//     sequencer.tempo.bpm = between(newBpm, 10, 300);
//     // sequencer.tempo.ms = 60000 / (sequencer.tempo.bpm * MAX_STEPS_PER_BEAT);
//     // interval = setInterval(loop, sequencer.tempo.ms);
//     // event.emit(eventKey.onBPMchange, sequencer.tempo);
// }
