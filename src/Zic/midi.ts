import { event, eventKey } from './event';

export let midi: WebMidi.MIDIAccess;

export function addListenerMidiSuccess(
    fn: (midiAccess: WebMidi.MIDIAccess) => void,
) {
    event.addListener(eventKey.onMIDISuccess, fn);
}

function onMIDISuccess(midiAccess: WebMidi.MIDIAccess) {
    midi = midiAccess;
    event.emit(eventKey.onMIDISuccess, midi);
    midi.inputs.forEach((midiInput) => {
        console.log('midiInput', midiInput.name, midiInput);
        midiInput.onmidimessage = onMIDIMessage;
    });
}

export function addListenerMidiError(fn: (error: any) => void) {
    event.addListener(eventKey.onMIDIError, fn);
}

function onMIDIError(error: any) {
    event.emit(eventKey.onMIDIError, error);
    console.error(
        "No access to MIDI devices or your browser doesn't support WebMIDI API.",
        error,
    );
}

function onMIDIMessage({ data }: WebMidi.MIDIMessageEvent) {
    // console.log('MIDI data', data);
}

export function initMIDI() {
    if (!navigator.requestMIDIAccess) {
        onMIDIError(new Error('This browser does not support MIDIAccess'));
    } else {
        navigator
            .requestMIDIAccess({ sysex: false })
            .then(onMIDISuccess, onMIDIError);
    }
}
