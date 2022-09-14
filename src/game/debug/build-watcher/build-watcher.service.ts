import * as fs from 'fs';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {ipcRenderer} from 'electron';

@Injectable()
export class BuildWatcherService implements OnReady {
    public gameOnReady(): void {
        if (process.env.PROFILE !== 'prod') {
            (async (): Promise<void> => {
                const watcher = fs.watch('./dist/');
                watcher.on('change', () => {
                    ipcRenderer.send('re-render');
                });
            })();
        }
    }
}
