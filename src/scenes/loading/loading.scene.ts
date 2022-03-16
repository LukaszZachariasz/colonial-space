import * as BABYLON from 'babylonjs';
import {LoadingSceneGui} from './gui/loading.scene-gui';
import {Scene} from '../scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingSceneGui> {
    public skybox: SpaceSkybox;

    constructor() {
        super(false);

        this.skybox = new SpaceSkybox();
        this.gui = new LoadingSceneGui();

        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
        this.skybox.create(this.scene);

        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
