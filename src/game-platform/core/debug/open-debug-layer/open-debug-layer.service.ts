import {Service} from 'typedi';
import {ipcRenderer} from 'electron';
import {sceneManager} from 'engine';

@Service()
export class OpenDebugLayerService {
    public start(): void {
        ipcRenderer.on('open-debug-layer', () => {
            sceneManager().currentBabylonScene.debugLayer.show({
                showInspector: true,
                overlay: true
            });
        });
    }
}
