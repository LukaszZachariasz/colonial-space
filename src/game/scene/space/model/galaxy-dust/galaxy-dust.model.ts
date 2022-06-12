import * as BABYLON from 'babylonjs';
import {ParticleSystemModel} from '../../../../../engine/model-manager/model-elements/particle-system-model';

export class GalaxyDustModel extends ParticleSystemModel {
    public particleEmitterType: BABYLON.SphereParticleEmitter;

    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
        this.particleEmitterType = new BABYLON.SphereParticleEmitter();
        this.particleEmitterType.radius = 10;
        this.particleEmitterType.radiusRange = 10;

        this.mesh = BABYLON.Mesh.CreateBox('emitter', 0.01, this.scene);
        this.particleSystem = new BABYLON.ParticleSystem('starsParticles', 50000, this.scene);

        this.particleSystem.particleTexture = new BABYLON.Texture('resources/galaxy-dust/galaxy-dust.png', this.scene);
        this.particleSystem.emitter = this.mesh;
        this.particleSystem.particleEmitterType = this.particleEmitterType;
        this.particleSystem.color1 = new BABYLON.Color4(0.898, 0.737, 0.718, 1.0);
        this.particleSystem.color2 = new BABYLON.Color4(0.584, 0.831, 0.894, 1.0);

        this.particleSystem.minSize = 0.15;
        this.particleSystem.maxSize = 0.3;

        this.particleSystem.minLifeTime = 999999;
        this.particleSystem.maxLifeTime = 999999;

        this.particleSystem.minEmitPower = 0.0;
        this.particleSystem.maxEmitPower = 0.0;
        this.particleSystem.minAngularSpeed = 11.1;
        this.particleSystem.maxAngularSpeed = 11.1;

        this.particleSystem.manualEmitCount = 500;

        this.particleSystem.updateSpeed = 2;
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);

        this.particleSystem.isBillboardBased = false;

        this.particleSystem.start();
    }
}
