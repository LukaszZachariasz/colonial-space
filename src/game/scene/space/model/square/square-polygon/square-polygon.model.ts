import * as BABYLON from 'babylonjs';
import {Model} from '../../model';
import {logic} from '../../../../../game';
import earcut from 'earcut';

export class SquarePolygonModel implements Model {
    public polygon: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;

    constructor(private id: string,
                private squarePoints: BABYLON.Vector3[]) {
    }

    public create(scene: BABYLON.Scene): void {
        const polygonMeshBuilder = new BABYLON.PolygonMeshBuilder('squarePolygon', this.mapPointsToVector2(), scene, earcut);
        this.polygon = polygonMeshBuilder.build(true);

        this.material = new BABYLON.StandardMaterial('squarePolygonMaterial', scene);
        this.material.alpha = 0;
        this.polygon.material = this.material;

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
    }

    private mapPointsToVector2(): BABYLON.Vector2[] {
        return this.squarePoints.map((point: BABYLON.Vector3) => new BABYLON.Vector2(point.x, point.z));
    }
}
