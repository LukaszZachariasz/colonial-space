import * as BABYLON from 'babylonjs';
import {LoadingGui} from './gui/loading.gui';
import {Scene} from '../../../engine/scene-manager/scene';
import {SpaceSkybox} from '../../../game/scene/space/model/skybox/space/space.skybox';

export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingGui> {
    public static readonly SCENE_NAME = 'LoadingScene';
    public name: string = LoadingScene.SCENE_NAME;

    constructor() {
        super(false);
        this.setUpCamera();
        this.setUpSkybox();
        this.setUpGui();

        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }

    private setUpCamera(): void {
        this.camera = new BABYLON.FreeCamera('LoadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
    }

    private setUpSkybox(): void {
        new SpaceSkybox(this.scene);
    }

    private setUpGui(): void {
        this.gui = new LoadingGui();
    }
}
