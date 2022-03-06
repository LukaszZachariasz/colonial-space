import {ipcRenderer} from 'electron';

const fs = require('fs');


(async (): Promise<void> => {
    const watcher = fs.watch('./dist/');
    watcher.on('change', () => {
        ipcRenderer.send('re-render');
    });
})();
