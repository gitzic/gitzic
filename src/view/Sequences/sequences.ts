import { loadSequences, saveSequences } from '../../git';
import {
    elByClass,
    elById,
    elFromHtml,
    evEach,
    evStrVal,
    removeChildClass,
} from '../../utils/dom';
import { onSequenceAdd, onSequencesChange, onSequenceChange } from '../../Zic';
import { addNewNote, Note, SequenceData, sequences } from '../../Zic/sequence';
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
        const sequence = sequences.find((seq) => seq.id === id);
        sequence && displaySequence(sequence);
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
        addNewNote(activeSequence, key / activeSequence.stepsPerBeat);
    }
}

async function addSequenceItem({ id, name }: SequenceData) {
    elById('sequence-selector').append(
        elFromHtml(`<option value="${id}">${name}</option>`),
    );
}
