import {ipcRenderer} from 'electron';

const fs = require('fs');

export function BuildWatcher(enable: boolean): any {
  if (enable) {
    (async (): Promise<void> => {
      const watcher = fs.watch('./dist/');
      watcher.on('change', () => {
        ipcRenderer.send('re-render');
      });
    })();
  }

  return function (constructor: any): any {
    return constructor;
  };
}
