import * as BABYLON from 'babylonjs';
import {GalaxyOriginContent} from '../../game-scenes/galaxy-scene/gui/galaxy-origin-content/galaxy-origin-content';
import gameState from '../../game-core/game-state/game-state';
import guiManager from '../../engine/gui-manager/gui-manager';

export class GeneratedGalaxyOrigin {
    public create(scene: BABYLON.Scene): void {
        const surfaceParticles = new BABYLON.ParticleSystem('surfaceParticles', 1600, scene);
        const flareParticles = new BABYLON.ParticleSystem('flareParticles', 20, scene);
        const glareParticles = new BABYLON.ParticleSystem('glareParticles', 600, scene);

        surfaceParticles.particleTexture = new BABYLON.Texture('resources/galaxies/galaxy-origin-01/surface.png', scene);
        flareParticles.particleTexture = new BABYLON.Texture('resources/galaxies/galaxy-origin-01/flare.png', scene);
        glareParticles.particleTexture = new BABYLON.Texture('resources/galaxies/galaxy-origin-01/star_point.png', scene);

        const originSphere = BABYLON.MeshBuilder.CreateSphere('coreSphere', {diameter: 6, segments: 64}, scene);
        const originMat = new BABYLON.StandardMaterial('originMat', scene);

        originMat.emissiveColor = new BABYLON.Color3(0.3773, 0.0930, 0.0266);
        originSphere.material = originMat;

        originSphere.renderingGroupId = 3;

        const actionManager = new BABYLON.ActionManager(scene);
        originSphere.actionManager = actionManager;
        actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickTrigger, () => {
            guiManager.create(new GalaxyOriginContent(gameState.gameplayState.galaxyState.galaxyOriginState));
        }));

        const sunEmitter = new BABYLON.SphereParticleEmitter();

        sunEmitter.radius = 3;
        sunEmitter.radiusRange = 0;

        surfaceParticles.preWarmStepOffset = 10;
        surfaceParticles.preWarmCycles = 100;
        surfaceParticles.minInitialRotation = -2 * Math.PI;
        surfaceParticles.maxInitialRotation = 2 * Math.PI;
        surfaceParticles.emitter = originSphere;
        surfaceParticles.particleEmitterType = sunEmitter;

        surfaceParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
        surfaceParticles.addColorGradient(0.4, new BABYLON.Color4(0.6259, 0.3056, 0.0619, 0.5));
        surfaceParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.5));
        surfaceParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));

        surfaceParticles.minSize = 1;
        surfaceParticles.maxSize = 2;
        surfaceParticles.minLifeTime = 8.0;
        surfaceParticles.maxLifeTime = 8.0;
        surfaceParticles.emitRate = 200;
        surfaceParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;

        surfaceParticles.gravity = new BABYLON.Vector3(0, 0, 0);
        surfaceParticles.minAngularSpeed = -0.4;
        surfaceParticles.maxAngularSpeed = 0.4;
        surfaceParticles.minEmitPower = 0;
        surfaceParticles.maxEmitPower = 0;
        surfaceParticles.updateSpeed = 0.005;
        surfaceParticles.isBillboardBased = false;

        surfaceParticles.renderingGroupId = 3;
        surfaceParticles.start();

        flareParticles.preWarmStepOffset = 10;
        flareParticles.preWarmCycles = 100;
        flareParticles.minInitialRotation = -2 * Math.PI;
        flareParticles.maxInitialRotation = 2 * Math.PI;
        flareParticles.emitter = originSphere;
        flareParticles.particleEmitterType = sunEmitter;

        flareParticles.addColorGradient(0, new BABYLON.Color4(1, 0.9612, 0.5141, 0.0));
        flareParticles.addColorGradient(0.25, new BABYLON.Color4(0.9058, 0.7152, 0.3825, 1.0));
        flareParticles.addColorGradient(1.0, new BABYLON.Color4(0.6320, 0.0, 0.0, 0.0));

        flareParticles.minScaleX = 0.5;
        flareParticles.minScaleY = 0.5;
        flareParticles.maxScaleX = 2;
        flareParticles.maxScaleY = 2;
        flareParticles.minLifeTime = 10.0;
        flareParticles.maxLifeTime = 10.0;
        flareParticles.emitRate = 1;
        flareParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
        flareParticles.gravity = new BABYLON.Vector3(0, 0, 0);
        flareParticles.minAngularSpeed = 0.0;
        flareParticles.maxAngularSpeed = 0.0;
        flareParticles.minEmitPower = 0.001;
        flareParticles.maxEmitPower = 0.01;
        flareParticles.isBillboardBased = true;

        flareParticles.renderingGroupId = 2;

        flareParticles.start();

        glareParticles.preWarmStepOffset = 10;
        glareParticles.preWarmCycles = 100;
        glareParticles.minInitialRotation = -2 * Math.PI;
        glareParticles.maxInitialRotation = 2 * Math.PI;
        glareParticles.emitter = originSphere;
        glareParticles.particleEmitterType = sunEmitter;

        glareParticles.addColorGradient(0, new BABYLON.Color4(0.8509, 0.4784, 0.1019, 0.0));
        glareParticles.addColorGradient(0.5, new BABYLON.Color4(0.6039, 0.2887, 0.0579, 0.12));
        glareParticles.addColorGradient(1.0, new BABYLON.Color4(0.3207, 0.0713, 0.0075, 0.0));

        glareParticles.minScaleX = 2;
        glareParticles.minScaleY = 2;
        glareParticles.maxScaleX = 5;
        glareParticles.maxScaleY = 10;
        glareParticles.minLifeTime = 2.0;
        glareParticles.maxLifeTime = 2.0;
        glareParticles.emitRate = 300;
        glareParticles.blendMode = BABYLON.ParticleSystem.BLENDMODE_ADD;
        glareParticles.gravity = new BABYLON.Vector3(0, 0, 0);
        glareParticles.minAngularSpeed = 0.0;
        glareParticles.maxAngularSpeed = 0.0;
        glareParticles.minEmitPower = 0.0;
        glareParticles.maxEmitPower = 0.0;
        glareParticles.isBillboardBased = true;
        glareParticles.renderingGroupId = 1;

        glareParticles.start();
    }
}
