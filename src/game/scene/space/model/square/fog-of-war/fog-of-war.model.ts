import * as BABYLON from 'babylonjs';
import {Model} from '../../model';
import {SquareModel} from '../square.model';
import {logic} from '../../../../../game';
import earcut from 'earcut';

export class FogOfWarModel implements Model {
    public polygon: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;

    public emitter: BABYLON.Mesh;

    private particleSystem: BABYLON.ParticleSystem;

    constructor(private id: string,
                private squarePoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        const polygonMeshBuilder = new BABYLON.PolygonMeshBuilder('squarePolygon', this.mapPointsToVector2(), scene, earcut);
        this.polygon = polygonMeshBuilder.build(true);
        this.polygon.position.y = 1;

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

        this.createNewSystem(scene);
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
                logic().unitMovementService.handleMovement(this.id);
            })
        );
    }

    private mapPointsToVector2(): BABYLON.Vector2[] {
        return this.squarePoints.map((point: BABYLON.Vector3) => new BABYLON.Vector2(point.x, point.z));
    }

    private createNewSystem(scene: BABYLON.Scene): void {
        const fogTexture = new BABYLON.Texture('resources/fog/fog.png', scene);

        this.particleSystem = new BABYLON.ParticleSystem(('square_particles_' + this.id), 50, scene);
        this.particleSystem.manualEmitCount = this.particleSystem.getCapacity();
        this.particleSystem.minEmitBox = new BABYLON.Vector3(0, 0, 0);
        this.particleSystem.maxEmitBox = new BABYLON.Vector3(SquareModel.SquareEdgeWidth, -2, SquareModel.SquareEdgeWidth);
        this.particleSystem.particleTexture = fogTexture.clone();
        this.particleSystem.emitter = this.emitter;

        this.particleSystem.color1 = new BABYLON.Color4(0.8, 0.1, 0.2, 0.1);
        this.particleSystem.color2 = new BABYLON.Color4(.2, .1, .95, 0.15);
        this.particleSystem.colorDead = new BABYLON.Color4(0.9, 0.9, 0.9, 0.1);
        this.particleSystem.minSize = 3.5;
        this.particleSystem.maxSize = 15.0;
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
}
