import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../../game/scene/space/model/skybox/space/space.skybox';

export class LoadingSkybox implements OnInit {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('loading')) private scene: BABYLON.Scene;

    public gameOnInit(): void {
        this.modelManagerService.addSimpleModel(new SpaceSkybox(this.scene));
    }
}
