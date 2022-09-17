import * as BABYLON from 'babylonjs';
import {GalaxyDustModel} from './galaxy-dust.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class GalaxyDust implements OnInit {
    @Inject(ModelManager) private modelManagerService: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;
    
    public gameOnInit(): void {
        this.modelManagerService.addParticleSystem(GalaxyDustModel, this.scene);
    }
}
