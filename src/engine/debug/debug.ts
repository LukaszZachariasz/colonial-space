import * as BABYLON from 'babylonjs';
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
            sceneLoader.scenes.forEach((scene: BABYLON.Scene) => scene.debugLayer.show());
        });
    }

    private fpsCounterListener(): void {
        this.fpsCounter = new FpsCounter();
        this.fpsCounter.startRendering();
    }
}

const instance = new Debug();
export default instance;