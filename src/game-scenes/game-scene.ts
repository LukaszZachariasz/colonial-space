import * as BABYLON from 'babylonjs';
import {v4 as uuidv4} from 'uuid';
import engine from 'engine';
import loadingScreenManager from '../engine/loading-scene/loading-scene-manager';

export abstract class GameScene {
    public scene: BABYLON.Scene = new BABYLON.Scene(engine.engine);
    private readonly uuid: string = uuidv4();

    constructor() {
        loadingScreenManager.startLoading(this.uuid);

        this.scene.executeWhenReady(() => {
            loadingScreenManager.stopLoading(this.uuid);
        });
    }
}
