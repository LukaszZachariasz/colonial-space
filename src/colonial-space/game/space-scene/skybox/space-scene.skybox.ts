import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from './space.skybox';
import {selectMapSkybox} from '../../game-logic/store/map/tour.selectors';

export class SpaceSceneSkybox implements OnLoad {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('space')) private scene: BABYLON.Scene;

    public gameOnLoad(): void {
        this.modelManagerService.addSimpleModel(new SpaceSkybox(this.scene, selectMapSkybox()));
    }
}
