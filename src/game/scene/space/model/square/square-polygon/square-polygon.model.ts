import * as BABYLON from 'babylonjs';
import {Inject} from '../../../../../../core/injector/inject';
import {Model} from '../../model';
import {SelectionService} from '../../../../../logic/selection/selection.service';
import {UnitModel} from '../../unit/unit.model';
import {UnitMovementService} from '../../../../../logic/unit/unit-movement.service';
import earcut from 'earcut';

export class SquarePolygonModel implements Model {
    public polygon: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;
    
    @Inject(SelectionService) private selectionService: SelectionService;
    @Inject(UnitMovementService) private unitMovementService: UnitMovementService;

    constructor(private squareId: string,
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
                this.selectionService.deselect();
            })
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                if (this.selectionService.selection$.value) {
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
                if (this.selectionService.selection$.value) {
                    this.unitMovementService.planMovingForUnit(
                        (this.selectionService.selection$.value as UnitModel).state,
                        this.squareId
                    );
                }
            })
        );
    }

    private mapPointsToVector2(): BABYLON.Vector2[] {
        return this.squarePoints.map((point: BABYLON.Vector3) => new BABYLON.Vector2(point.x, point.z));
    }
}
