import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkyboxConst} from '../../../shared/skybox/space-skybox.const';
import {SpaceSkyboxModel} from '../../../shared/skybox/space-skybox.model';

export class MainMenuSkybox implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;
    
    public gameOnInit(): void {
        this.modelManager.addModel(SpaceSkyboxModel, this.scene, SpaceSkyboxConst[3]);
    }
}
