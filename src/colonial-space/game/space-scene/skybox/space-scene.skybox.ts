import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../../../shared/skybox/space.skybox';
import {selectMapSkybox} from '../../game-logic/store/map/tour.selectors';

export class SpaceSceneSkybox implements OnInit {
    @Inject(ModelManager) private modelManagerService: ModelManager;
    @Inject(SCENE('space')) private scene: BABYLON.Scene;

    public gameOnInit(): void {
        this.modelManagerService.addSimpleModel(new SpaceSkybox(this.scene, selectMapSkybox()));
    }
}
