import {ipcRenderer} from "electron";

const fs = require('fs');


(async () => {
    const watcher = fs.watch('./dist/');
    watcher.on('change', () => {
        ipcRenderer.send('re-render');
    });
})();
