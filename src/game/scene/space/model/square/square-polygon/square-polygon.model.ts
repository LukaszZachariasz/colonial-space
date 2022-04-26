import * as BABYLON from 'babylonjs';
import {Model} from '../../model';
import {logic} from '../../../../../game';
import earcut from 'earcut';

export class SquarePolygonModel implements Model {
    public polygon: BABYLON.Mesh;

    public emitter: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;

    private particleSystem: BABYLON.ParticleSystem;

    constructor(private id: string,
                private squarePoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        const polygonMeshBuilder = new BABYLON.PolygonMeshBuilder('squarePolygon', this.mapPointsToVector2(), scene, earcut);
        this.polygon = polygonMeshBuilder.build(true);

        this.material = new BABYLON.StandardMaterial('squarePolygonMaterial', scene);
        this.material.alpha = 0;
        this.polygon.material = this.material;

        this.emitter = polygonMeshBuilder.build(true);
        this.emitter.setPositionWithLocalVector(new BABYLON.Vector3(this.mapPointsToVector2()[0].x, 2, this.mapPointsToVector2()[0].y));
        this.emitter.material = new BABYLON.StandardMaterial('squareEmitterPolygonMaterial', scene);
        this.emitter.material.alpha = 0;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(scene);
        this.polygon.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                logic().selectedUnitService.deselect();
            })
        );

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
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnRightPickTrigger, () => {
                logic().unitMovementService.handleMovement(this.id);
            })
        );

        this.createNewSystem(scene);
    }


    private createNewSystem(scene: BABYLON.Scene): void {
        const fogTexture = new BABYLON.Texture('resources/fog/fog.png', scene);

        this.particleSystem = new BABYLON.ParticleSystem(('square_particles_' + this.id), 250, scene);
        this.particleSystem.manualEmitCount = this.particleSystem.getCapacity();
        this.particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0); // Starting all from
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(10, -2, 10); // To...
        this.particleSystem.particleTexture = fogTexture.clone();
        this.particleSystem.emitter = this.emitter;

        this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.8, 0.8, 0.1);
        this.particleSystem.color2 = new BABYLON.Color4(.95, .95, .95, 0.15);
        this.particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
        this.particleSystem.minSize = 3.5;
        this.particleSystem.maxSize = 5.0;
        this.particleSystem.minLifeTime = Number.MAX_SAFE_INTEGER;
        this.particleSystem.emitRate = 50;
        this.particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
        this.particleSystem.gravity = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.direction1 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.direction2 = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.minAngularSpeed = -2;
        this.particleSystem.maxAngularSpeed = 2;
        this.particleSystem.minEmitPower = .5;
        this.particleSystem.maxEmitPower = 1;
        this.particleSystem.updateSpeed = 0.005;

        this.particleSystem.start();
    }

    private mapPointsToVector2(): BABYLON.Vector2[] {
        return this.squarePoints.map((point: BABYLON.Vector3) => new BABYLON.Vector2(point.x, point.z));
    }
}
