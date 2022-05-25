import * as BABYLON from 'babylonjs';
import {delay, EMPTY, of, take, tap} from 'rxjs';
import {logic} from '../../../../../../game';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {SquareModel} from '../square.model';

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

    public shouldUpdate = true;

    private fogConfig: FogOfWarParticlesConfig = {
        minSize: 5,
        maxSize: 15,
        maxHeight: 0,
        minHeight: -2,
        updateSpeed: 1,
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
                logic().selectedTerritoryService.deselect();
            })
        );

        this.createNewSystem(this.fogConfig);


        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                logic().unitMovementService.handleMovement(this.state.id);
            })
        );
    }

    private createNewSystem(config: FogOfWarParticlesConfig): void {
        const fogTexture = new BABYLON.Texture('resources/fog/fog.png', this.scene);
        this.particleSystem = new BABYLON.ParticleSystem(('square_particles_' + this.state.id), 15, this.scene);

        this.particleSystem.manualEmitCount = this.particleSystem.getCapacity();
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, config.maxHeight, -SquareModel.SquareEdgeSize / 2);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, config.minHeight, SquareModel.SquareEdgeSize / 2);
        this.particleSystem.particleTexture = fogTexture.clone();
        this.particleSystem.emitter = this.emitter;

        this.particleSystem.color1 = config.color1;
        this.particleSystem.color2 = config.color2;
        this.particleSystem.minSize = config.minSize;
        this.particleSystem.maxSize = config.maxSize;
        this.particleSystem.minLifeTime = 1;
        this.particleSystem.maxLifeTime = 2;
        this.particleSystem.emitRate = 50;
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.gravity = BABYLON.Vector3.Zero();
        this.particleSystem.direction1 = BABYLON.Vector3.Zero();
        this.particleSystem.direction2 = BABYLON.Vector3.Zero();
        this.particleSystem.updateSpeed = config.updateSpeed;

        this.particleSystem.updateFunction = (particles: BABYLON.Particle[]): void => {
            particles.forEach((singleParticle: BABYLON.Particle) => {
                singleParticle.age = 10;
                if (singleParticle.size < (config.minSize + config.maxSize) * 0.5) {
                    singleParticle.angle += singleParticle.size * config.angleSpeed;
                } else {
                    singleParticle.angle -= singleParticle.size * config.angleSpeed;
                }
            });
        };

        this.particleSystem.start();
    }

    public destroy(): void {
        of(EMPTY).pipe(
            delay(BABYLON.Scalar.RandomRange(1000, 1500)),
            take(1),
            tap(() => {
                this.particleSystem.updateFunction = (particles: BABYLON.Particle[]): void => {
                    particles.forEach((p: BABYLON.Particle) => {
                        if (p.color.a <= 0) {
                            return;
                        }

                        p.color.a -= BABYLON.Scalar.RandomRange(0.001, 0.01);
                        p.position.x += BABYLON.Scalar.RandomRange(0.05, 0.4) * BABYLON.Scalar.RandomRange(-1, 1);
                        p.position.y += BABYLON.Scalar.RandomRange(0.05, 0.4) * BABYLON.Scalar.RandomRange(-1, 1);
                        p.position.z += BABYLON.Scalar.RandomRange(0.05, 0.4) * BABYLON.Scalar.RandomRange(-1, 1);
                    });
                };
            })
        ).subscribe();
    }
}
