import * as BABYLON from 'babylonjs';
import {LoadingGui} from './gui/loading.gui';
import {Scene} from '../../../engine/scene-manager/scene';
import {SpaceSkybox} from '../space/skybox/space/space.skybox';

export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingGui> {
    public static readonly SCENE_NAME = 'loading-scene';

    public name: string = LoadingScene.SCENE_NAME;
    public skybox: SpaceSkybox = new SpaceSkybox();
    public gui: LoadingGui = new LoadingGui();

    constructor() {
        super(false);
        this.camera = new BABYLON.FreeCamera('loadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);

        this.skybox.create(this.scene);
        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
