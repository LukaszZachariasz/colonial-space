import * as BABYLON from 'babylonjs';
import {AfterCreated} from '../engine/lifecycle/after-created/after-created';
import {GameScene} from '../engine/scene-manager/game-scene';
import {LoadingGui} from './gui/loading.gui';
import {Scene} from '../engine/scene-manager/scene';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';
import {modelManager} from 'engine';

@GameScene({
    name: 'LoadingScene',
    preload: true
})
export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingGui> implements AfterCreated {
    public camera = new BABYLON.FreeCamera('LoadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
    public gui: LoadingGui = new LoadingGui();

    public gameAfterCreated(): void {
        modelManager().addModel(new SpaceSkybox(this.scene));

        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
