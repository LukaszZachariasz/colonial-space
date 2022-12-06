import * as fs from 'fs';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {ipcRenderer} from 'electron';

@Injectable()
export class BuildWatcherService implements OnInit {
    public gameOnInit(): void {
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
