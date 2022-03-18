import * as BABYLON from 'babylonjs';
import {LoadingSceneGui} from './gui/loading.scene-gui';
import {Scene} from '../scene';
import {SpaceSkybox} from '../../game-objects/space-skybox/space-skybox';

export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingSceneGui> {
    public static readonly SCENE_NAME = 'loading-scene';

    public name: string = LoadingScene.SCENE_NAME;
    public skybox: SpaceSkybox = new SpaceSkybox();
    public gui: LoadingSceneGui = new LoadingSceneGui();

    constructor() {
        super(false);
        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);

        this.skybox.create(this.scene);
        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
