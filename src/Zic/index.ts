import { initMIDI } from './midi';
import { initSequencer } from './sequencer';

export * from './midi';
export * from './event';
export * from './sequencer';

export function init() {
    initMIDI();
    initSequencer();
}
