import * as BABYLON from 'babylonjs';
import {EMPTY, Subject, Subscription, delay, filter, of, take, tap} from 'rxjs';
import {FogOfWarParticlesConfig} from './fog-of-war-particles-config';
import {ParticleSystemModel} from '../../../../../../../engine/model-manager/model-elements/particle-system-model';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {logic} from '../../../../../../game';
import {modelManager} from 'engine';

export class FogOfWarModel extends ParticleSystemModel {
    public material: BABYLON.StandardMaterial;
    public destroyed$: Subject<void> = new Subject<void>();

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

    private removeFogOfWarSubscription: Subscription;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        super();
    }

    public onCreate(): void {
        this.mesh = BABYLON.MeshBuilder.CreatePlane('FogOfWar', {
            width: SquareModel.SquareEdgeSize,
            height: SquareModel.SquareEdgeSize
        }, this.scene);
        this.mesh.position.y = 1;

        this.material = new BABYLON.StandardMaterial('SquarePolygonMaterial', this.scene);
        this.material.alpha = 0;
        this.mesh.material = this.material;

        this.emitter = this.mesh;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(this.scene);
        this.mesh.actionManager = actionManager;

        this.createNewSystem(this.fogConfig);

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                logic().selectedUnitService.deselect();
                logic().selectedTerritoryService.deselect();
            })
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                logic().unitMovementService.handleMovement(this.state.id);
            })
        );

        this.removeFogOfWarSubscription = logic().fogOfWarService.removeFogOfWar$.pipe(
            filter((id: string) => this.state.id === id),
            tap(() => this.destroy()),
        ).subscribe();
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

    private destroy(): void {
        of(EMPTY).pipe(
            delay(Math.floor(BABYLON.Scalar.RandomRange(1000, 1500))),
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
            }),
            delay(1500),
            tap(() => modelManager().removeModel(this))
        ).subscribe();
    }

    public onDestroy(): void {
        this.destroyed$.next();
        this.removeFogOfWarSubscription?.unsubscribe();
    }
}
