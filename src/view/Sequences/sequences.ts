import { loadSequences, saveSequences } from '../../git';
import {
    elByClass,
    elById,
    elFromHtml,
    evEach,
    evNumVal,
    evStrVal,
    removeChildClass,
    setClass,
} from '../../utils/dom';
import { fill, on } from '../../utils/utils';
import { onSequenceAdd, onSequencesChange, onSequenceChange } from '../../Zic';
import {
    addNote,
    Note,
    SequenceData,
    sequences,
    setNote,
    removeNote,
} from '../../Zic/sequence';
import { Sequence } from '../Components/Sequence';

let activeSequence: SequenceData;
let selectedNote: Note;

export function findNote({ notes, stepsPerBeat }: SequenceData, key: number) {
    return notes.find(({ time }) => time * stepsPerBeat === key);
}

export function initSequences() {
    onSequencesChange(displaySequences);
    onSequenceAdd(addSequenceItem);
    onSequenceChange(
        (sequence) =>
            sequence.id === activeSequence?.id && displaySequence(sequence),
    );

    elById('sequences-reload').onclick = btnLoading(loadSequences);
    // ToDo: in a later point we might save a single sequence
    elById('sequence-save').onclick = btnLoading(saveSequences, 'Saving');

    evEach(elByClass('sequence-edit'), 'click', () =>
        elById('sequence-edit-modal').classList.toggle('hide'),
    );

    elById('sequence-edit-note-midi').onchange = evNumVal((midi) => {
        selectedNote.midi = midi;
        setNote(activeSequence, selectedNote);
    });

    elById('sequence-edit-note-velocity').onchange = evNumVal((velocity) => {
        selectedNote.velocity = velocity;
        setNote(activeSequence, selectedNote);
    });

    elById('sequence-edit-note-length').onchange = evNumVal((len) => {
        selectedNote.duration = len / activeSequence.stepsPerBeat;
        if (selectedNote.duration) {
            setNote(activeSequence, selectedNote);
        } else {
            removeNote(activeSequence, selectedNote);
        }
    });

    elById('sequence-edit-note-slide').onclick = () => {
        selectedNote.slide = !selectedNote.slide;
        setNote(activeSequence, selectedNote);
        setClass(
            elById('sequence-edit-note-slide'),
            'active',
            selectedNote.slide,
        );
    };
}

function btnLoading(fn: () => Promise<void>, text = 'Loading') {
    return async (ev: Event) => {
        const el = ev.target as HTMLElement;
        const current = el.innerText;
        el.innerText = text;
        await fn();
        el.innerText = current;
    };
}

function displaySequences(sequenceList: SequenceData[]) {
    elById('sequence-selector').innerHTML = '';
    sequenceList.forEach(addSequenceItem);
    const [sequence] = sequenceList;
    if (sequence) {
        activeSequence = sequence;
        displaySequence(sequence);
    }
    elById('sequence-selector').onchange = evStrVal((id) => {
        activeSequence = sequences.find((seq) => seq.id === id);
        activeSequence && displaySequence(activeSequence);
    });
}

async function displaySequence(sequence: SequenceData) {
    const html = await Sequence({
        sequence,
        noteMargin: 4,
        noteBorder: 2,
        noteWidth: 30,
        selectedNote,
    }).render();
    elById('sequence-edit-notes').innerHTML = html as string;
    evEach(
        elById('sequence-edit-notes').getElementsByClassName('note'),
        'click',
        ({ currentTarget }) => selectNote(currentTarget as HTMLElement),
    );
}

function selectNote(el: HTMLElement) {
    removeChildClass(el.parentElement, 'selected');
    el.classList.add('selected');
    const key = Number(el.dataset.key);
    selectedNote = findNote(activeSequence, key);
    if (!selectedNote) {
        selectedNote = {
            midi: 60,
            duration: 1 / activeSequence.stepsPerBeat,
            time: key / activeSequence.stepsPerBeat,
            velocity: 90,
        };
        addNote(activeSequence, selectedNote);
    }
    elById('sequence-edit-note').classList.remove('hide');
    (elById(
        'sequence-edit-note-midi',
    ) as HTMLInputElement).value = selectedNote.midi.toString();
    setClass(elById('sequence-edit-note-slide'), 'active', selectedNote.slide);
    (elById(
        'sequence-edit-note-velocity',
    ) as HTMLInputElement).value = selectedNote.velocity.toString();

    const next =
        activeSequence.notes.find(({ time }) => time > selectedNote.time)
            ?.time || activeSequence.beatCount;
    const len = (next - selectedNote.time) * activeSequence.stepsPerBeat + 1;
    const duration = selectedNote.duration * activeSequence.stepsPerBeat;
    elById('sequence-edit-note-length').innerHTML = fill(
        len,
        (key) => `<option ${on(key === duration, 'selected')}>${key}</option>`,
    ).join('');
}

async function addSequenceItem({ id, name }: SequenceData) {
    elById('sequence-selector').append(
        elFromHtml(`<option value="${id}">${name}</option>`),
    );
}
