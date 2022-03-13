import * as BABYLON from 'babylonjs';
import {LoadingSceneGui} from './gui/loading.scene-gui';
import {Scene} from '../scene';

export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingSceneGui> {
    constructor() {
        super(false);

        this.name = 'LoadingScene';
        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.gui = new LoadingSceneGui();
    }
}
