import {FpsCounter} from './fps-counter/fps-counter';
import {ipcRenderer} from 'electron';
import sceneLoader from '../scene-loader/scene-loader';

export class Debug {
    private fpsCounter: FpsCounter;

    public debug(): void {
        this.openDebugLayerListener();
        this.fpsCounterListener();
    }

    private openDebugLayerListener(): void {
        ipcRenderer.on('open-debug-layer', () => {
            sceneLoader.currentScene.scene.debugLayer.show({
                showInspector: true,
                overlay: true
            });
        });
    }

    private fpsCounterListener(): void {
        this.fpsCounter = new FpsCounter();
        this.fpsCounter.startRendering();
    }
}

const instance = new Debug();
export default instance;
