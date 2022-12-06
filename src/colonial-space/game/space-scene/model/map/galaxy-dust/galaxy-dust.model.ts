import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelParticleSystem} from '@colonial-space/core/module/scene/model/particle-system/model-particle-system';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';

export class GalaxyDustModel extends ModelParticleSystem implements OnInit, OnLoad, OnUnload {
    @Inject(SCENE) private scene: BABYLON.Scene;

    public gameOnInit(): void {
        this.particleSystem = new BABYLON.ParticleSystem('galaxyDust', 20000, this.scene);
        this.particleSystem.particleTexture = new BABYLON.Texture('resources/galaxy-dust/galaxy-dust.png', this.scene);

        this.particleSystem.addColorGradient(0, new BABYLON.Color4(0.5, 0.5, 0.5, 0));
        this.particleSystem.addColorGradient(0.2, new BABYLON.Color4(0.5, 0.5, 0.5, 0.5));
        this.particleSystem.addColorGradient(0.3, new BABYLON.Color4(0.5, 0.5, 0.5, 1));
        this.particleSystem.addColorGradient(0.5, new BABYLON.Color4(0.5, 0.5, 0.5, 1));
        this.particleSystem.addColorGradient(0.7, new BABYLON.Color4(0.5, 0.5, 0.5, 1));
        this.particleSystem.addColorGradient(0.9, new BABYLON.Color4(0.5, 0.5, 0.5, 0.3));
        this.particleSystem.addColorGradient(1, new BABYLON.Color4(0.5, 0.5, 0.5, 0));

        this.particleSystem.minSize = 0.1;
        this.particleSystem.maxSize = 0.5;

        this.particleSystem.minLifeTime = 3;
        this.particleSystem.maxLifeTime = 5;

        this.particleSystem.emitRate = 1600;

        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

        this.particleSystem.direction1 = new BABYLON.Vector3(10, -1, 1);
        this.particleSystem.direction2 = new BABYLON.Vector3(-10, -5, 10);

        this.particleSystem.minEmitPower = .01;
        this.particleSystem.maxEmitPower = .1;

        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI / 16;
    }
    
    public gameOnLoad(): void {
        this.particleSystem.start();
    }
    
    public gameOnUnload(): void {
        this.particleSystem.stop();
    }
}
