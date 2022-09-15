import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../../shared/skybox/space.skybox';

export class LoadingSkybox implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SCENE('loading')) private scene: BABYLON.Scene;

    public gameOnInit(): void {
        this.modelManager.addSimpleModel(new SpaceSkybox(this.scene));
    }
}
