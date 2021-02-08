import { loadSequences } from './git';
import { ActionWorker, MsgWorker } from './interface';
import { initApp } from './view/app';
import { App } from './view/App';
import { init, midi } from './Zic';
import { initSequences } from './Zic/sequence';

// init html
App()
    .render()
    .then((html) => {
        document.getElementById('app').innerHTML = html as string;
        initApp();
        initSequences();
    });

const worker = new Worker('sequencerWorker.ts');

const msg: MsgWorker = {
    action: ActionWorker.save,
    sequences: [
        { id: '1', trigger: 0, data: [0x90, 50, 90] },
        { id: '2', trigger: 1, data: [0x80, 50, 0] },
        { id: '3', trigger: 6, data: [0x90, 60, 90] },
        { id: '4', trigger: 8, data: [0x80, 60, 0] },
        { id: '5', trigger: 14, data: [0x90, 70, 90] },
        { id: '6', trigger: 15, data: [0x80, 70, 0] },
    ],
};
worker.postMessage(msg);

init();
loadSequences();

worker.addEventListener(
    'message',
    function ({ data }) {
        // console.log('data', data);
        midi.outputs.forEach((midiOutput) => {
            midiOutput.send(data.data);
        });
    },
    false,
);
