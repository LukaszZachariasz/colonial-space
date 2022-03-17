import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';

export class GeneratedGalaxyDust implements GameObject {

    public create(scene: BABYLON.Scene): void {
        const starsEmitter = new BABYLON.SphereParticleEmitter();
        starsEmitter.radius = 10;
        starsEmitter.radiusRange = 10;

        const stars = BABYLON.Mesh.CreateBox('emitter', 0.01, scene);
        const starsParticles = new BABYLON.ParticleSystem('starsParticles', 50000, scene);

        starsParticles.particleTexture = new BABYLON.Texture('resources/galaxies/galaxy-origin-01/star_point.png', scene);
        starsParticles.emitter = stars;
        starsParticles.particleEmitterType = starsEmitter;
        starsParticles.color1 = new BABYLON.Color4(0.898, 0.737, 0.718, 1.0);
        starsParticles.color2 = new BABYLON.Color4(0.584, 0.831, 0.894, 1.0);

        starsParticles.minSize = 0.15;
        starsParticles.maxSize = 0.3;

        starsParticles.minLifeTime = 999999;
        starsParticles.maxLifeTime = 999999;

        starsParticles.minEmitPower = 0.0;
        starsParticles.maxEmitPower = 0.0;
        starsParticles.minAngularSpeed = 11.1;
        starsParticles.maxAngularSpeed = 11.1;


        starsParticles.manualEmitCount = 500;

        starsParticles.updateSpeed = 2;
        starsParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        starsParticles.gravity = new BABYLON.Vector3(0, 0, 0);


        starsParticles.isBillboardBased = false;

        starsParticles.start();
    }
}
