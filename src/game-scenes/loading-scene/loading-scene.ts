import * as BABYLON from 'babylonjs';
import {GameScene} from '../game-scene';
import {LoadingSceneGui} from './gui/loading-scene-gui';

export class LoadingScene extends GameScene<BABYLON.FreeCamera, LoadingSceneGui> {
    constructor() {
        super(false);

        this.name = 'LoadingScene';
        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.gui = new LoadingSceneGui();
    }
}
