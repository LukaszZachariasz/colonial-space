import * as BABYLON from 'babylonjs';
import {AfterCreated} from '../../core/lifecycle/after-created/after-created';
import {GameScene} from '../core/scene-manager/game-scene';
import {Inject} from '@colonial-space/core/injector/inject';
import {LoadingGui} from './gui/loading.gui';
import {ModelManagerService} from '../core/model-manager/model-manager.service';
import {Scene} from '../core/scene-manager/scene';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';

@GameScene({
    name: 'LoadingScene',
    preload: true
})
export class LoadingScene extends Scene<BABYLON.FreeCamera, LoadingGui> implements AfterCreated {
    public camera = new BABYLON.FreeCamera('LoadingSceneCamera', new BABYLON.Vector3(0, 0, 0), this.scene);
    public gui: LoadingGui = new LoadingGui();
    
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;

    public gameAfterCreated(): void {
        this.modelManagerService.addSimpleModel(new SpaceSkybox(this.scene));

        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
