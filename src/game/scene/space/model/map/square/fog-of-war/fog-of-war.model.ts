import * as BABYLON from 'babylonjs';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {logic} from '../../../../../../game';

export interface FogOfWarParticlesConfig {
    minSize: number;
    maxSize: number;
    updateSpeed: number;
    angleSpeed: number;
    minHeight: number;
    maxHeight: number;
    color1: BABYLON.Color4;
    color2: BABYLON.Color4;
}

export class FogOfWarModel {
    public plane: BABYLON.Mesh;
    public emitter: BABYLON.Mesh;

    private particleSystem: BABYLON.ParticleSystem;

    private fogConfig: FogOfWarParticlesConfig = {
        minSize: 5,
        maxSize: 18,
        maxHeight: 0,
        minHeight: -2,
        updateSpeed: 0.005,
        angleSpeed: 0.0002,
        color1: new BABYLON.Color4(.8, .1, .8, .3),
        color2: new BABYLON.Color4(.2, .1, .9, .3)
    };

    private readonly material: BABYLON.StandardMaterial;


    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        this.plane = BABYLON.MeshBuilder.CreatePlane('FogOfWar', {
            width: SquareModel.SquareEdgeSize,
            height: SquareModel.SquareEdgeSize
        }, this.scene);
        this.plane.position.y = 1;

        this.material = new BABYLON.StandardMaterial('SquarePolygonMaterial', this.scene);
        this.material.alpha = 0;
        this.plane.material = this.material;

        this.emitter = this.plane;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(this.scene);
        this.plane.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                logic().selectedUnitService.deselect();
            })
        );

        this.particleSystem = this.createNewSystem(this.fogConfig);

        this.particleSystem.start();

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                logic().unitMovementService.handleMovement(this.state.id);
            })
        );
    }

    private createNewSystem(config: FogOfWarParticlesConfig): BABYLON.ParticleSystem {
        const fogTexture = new BABYLON.Texture('resources/fog/fog.png', this.scene);
        const particleSystem = new BABYLON.ParticleSystem(('square_particles_' + this.state.id), 15, this.scene);

        particleSystem.manualEmitCount = particleSystem.getCapacity();
        particleSystem.minEmitBox = new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, config.maxHeight, -SquareModel.SquareEdgeSize / 2);
        particleSystem.maxEmitBox = new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, config.minHeight, SquareModel.SquareEdgeSize / 2);
        particleSystem.particleTexture = fogTexture.clone();
        particleSystem.emitter = this.emitter;

        particleSystem.color1 = config.color1;
        particleSystem.color2 = config.color2;
        particleSystem.minSize = config.minSize;
        particleSystem.maxSize = config.maxSize;
        particleSystem.minLifeTime = 10;
        particleSystem.emitRate = 50;
        particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        particleSystem.gravity = BABYLON.Vector3.Zero();
        particleSystem.direction1 = BABYLON.Vector3.Zero();
        particleSystem.direction2 = BABYLON.Vector3.Zero();
        particleSystem.updateSpeed = config.updateSpeed;

        particleSystem.updateFunction = (particles: BABYLON.Particle[]): void => {
            particles.forEach((singleParticle: BABYLON.Particle) => {
                singleParticle.age = 10;

                if (singleParticle.size < (config.minSize + config.maxSize) * 0.5) {
                    singleParticle.angle += singleParticle.size * config.angleSpeed;
                } else {
                    singleParticle.angle -= singleParticle.size * config.angleSpeed;
                }
            });
        };

        return particleSystem;
    }
}
