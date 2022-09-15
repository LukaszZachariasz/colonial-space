import * as BABYLON from 'babylonjs';
import {GalaxyDustModel} from './galaxy-dust.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class GalaxyDust implements OnInit {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('space')) private scene: BABYLON.Scene;
    
    public gameOnInit(): void {
        this.modelManagerService.addSimpleModel(new GalaxyDustModel(this.scene));
    }
}
