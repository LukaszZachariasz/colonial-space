import * as BABYLON from 'babylonjs';
import {MapGenerator} from '../../../../logic/store-generator/map-generator/map.generator';
import {ParticleSystemModel} from '../../../../../../core/model-manager/model-elements/particle-system-model';
import {SquareModel} from '../map/square/square.model';

export class GalaxyDustModel extends ParticleSystemModel {
    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
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

        this.particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(MapGenerator.MapWidth * SquareModel.SquareEdgeSize, 5, -(MapGenerator.MapHeight * SquareModel.SquareEdgeSize));

        this.particleSystem.direction1 = new BABYLON.Vector3(10, -1, 1);
        this.particleSystem.direction2 = new BABYLON.Vector3(-10, -5, 10);

        this.particleSystem.minEmitPower = .01;
        this.particleSystem.maxEmitPower = .1;

        this.particleSystem.minAngularSpeed = 0;
        this.particleSystem.maxAngularSpeed = Math.PI / 16;


        this.particleSystem.start();
    }
}
