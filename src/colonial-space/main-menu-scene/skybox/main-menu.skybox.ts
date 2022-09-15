import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../../shared/skybox/space.skybox';
import {SpaceSkyboxConst} from '../../shared/skybox/space-skybox.const';

export class MainMenuSkybox implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    
    public gameOnInit(): void {
        this.modelManager.addSimpleModel(new SpaceSkybox(this.scene, SpaceSkyboxConst[3]));
    }
}
