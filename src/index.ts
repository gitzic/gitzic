import { loadSequences } from './git';
import { initApp } from './view/app';
import { App } from './view/App';
import { init } from './Zic';
import { initSequences } from './Zic/sequence';

// init html
App()
    .render()
    .then((html) => {
        document.getElementById('app').innerHTML = html as string;
        initApp();
        initSequences();
    });

init();
loadSequences();
