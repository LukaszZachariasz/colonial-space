import * as BABYLON from 'babylonjs';
import {selectSquareById, selectSquareByUnitId} from '../../../../../../logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

export class UnitMovementPathModel {
    public lines: BABYLON.LinesMesh;

    private plannedMovementPoints: BABYLON.Vector3[] = [];
    private readonly inTourColor: BABYLON.Color4 = new BABYLON.Color4(0, 1, 0);
    private readonly notInTourColor: BABYLON.Color4 = new BABYLON.Color4(0.5, 0.5, 0.5);

    constructor(private scene: BABYLON.Scene,
                private id: string) {
        this.render();
    }

    public render(): void {
        this.createPlannedMovementPoints();

        if (this.plannedMovementPoints.length) {
            const unit = selectUnitById(this.id);

            this.lines = BABYLON.MeshBuilder.CreateLines('unitMovementPath', {
                points: this.plannedMovementPoints,
                colors: this.plannedMovementPoints.map((el: BABYLON.Vector3, i: number) => {
                    if (i < unit.movementPointsLeft) {
                        return this.inTourColor;
                    } else {
                        return this.notInTourColor;
                    }
                }),
                useVertexAlpha: false
            }, this.scene);
        }
    }

    public recalculate(): void {
        this.lines?.dispose();
        this.render();
    }

    private createPlannedMovementPoints(): void {
        this.plannedMovementPoints = [];
        this.plannedMovementPoints.push(new BABYLON.Vector3(selectSquareByUnitId(this.id).x, 0, selectSquareByUnitId(this.id).y));
        selectUnitById(this.id).movementPlanning.forEach((squareId: string) => {
            this.plannedMovementPoints.push(
                new BABYLON.Vector3(selectSquareById(squareId).x, 0, selectSquareById(squareId).y)
            );
        });
    }
}
