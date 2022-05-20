import * as BABYLON from 'babylonjs';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {logic} from '../../../../../../game';

export class FogOfWarModel {
    public plane: BABYLON.Mesh;
    public emitter: BABYLON.Mesh;

    private readonly material: BABYLON.StandardMaterial;
    private particleSystem: BABYLON.ParticleSystem;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        this.plane = BABYLON.MeshBuilder.CreatePlane('FogOfWar', {
            width: SquareModel.SquareEdgeSize,
            height: SquareModel.SquareEdgeSize
        }, this.scene);
        this.plane.rotation.x = Math.PI / 2;
        this.plane.position.y = 1;

        this.material = new BABYLON.StandardMaterial('SquarePolygonMaterial', this.scene);
        this.material.alpha = 0;
        this.plane.material = this.material;

        this.emitter = this.plane;
        this.emitter.material = new BABYLON.StandardMaterial('SquareEmitterPolygonMaterial', this.scene);
        this.emitter.material.alpha = 0;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(this.scene);
        this.plane.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                logic().selectedUnitService.deselect();
            })
        );

        this.createNewSystem();
        /*
                actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                        if (logic().selectedUnitService.selectedUnit$.value) {
                            this.material.alpha = 0.1;
                        }
                    })
                );

                actionManager.registerAction(
                    new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                        this.material.alpha = 0;
                    })
                );*/

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                logic().unitMovementService.handleMovement(this.state.id);
            })
        );
    }

    private createNewSystem(): void {
        const fogTexture = new BABYLON.Texture('resources/fog/fog.png', this.scene);

        this.particleSystem = new BABYLON.ParticleSystem(('square_particles_' + this.state.id), 15, this.scene);
        this.particleSystem.manualEmitCount = this.particleSystem.getCapacity();
        this.particleSystem.minEmitBox = new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, -SquareModel.SquareEdgeSize / 2);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, -2, SquareModel.SquareEdgeSize / 2);
        this.particleSystem.particleTexture = fogTexture.clone();
        this.particleSystem.emitter = this.emitter;

        this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.1, 0.8, 0.3);
        this.particleSystem.color2 = new BABYLON.Color4(.2, .1, .95, 0.3);
        this.particleSystem.minSize = 5;
        this.particleSystem.maxSize = 18.0;
        this.particleSystem.minLifeTime = 10;
        this.particleSystem.emitRate = 50;
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.updateSpeed = 0.005;

        this.particleSystem.updateFunction = (particles: BABYLON.Particle[]): void => {
            particles.forEach((singleParticle: BABYLON.Particle) => {
                singleParticle.age = 10;
                singleParticle.angle += singleParticle.size * 0.0002;
            });
        };

        this.particleSystem.start();
    }
}
