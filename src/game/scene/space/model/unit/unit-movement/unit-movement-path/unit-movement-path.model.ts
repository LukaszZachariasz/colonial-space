import * as BABYLON from 'babylonjs';
import {Model} from '../../../model';
import {sceneManager} from 'engine';
import {selectSquareById, selectSquareByUnitId} from '../../../../../../logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../../logic/store/unit/unit.selectors';

export class UnitMovementPathModel extends Model {
    public lines: BABYLON.LinesMesh;
    private plannedMovementPoints: BABYLON.Vector3[] = [];
    
    constructor(private id: string) {
        super();
    }
    
    public create(scene: BABYLON.Scene): void {
        this.createPlannedMovementPoints();

        if (this.plannedMovementPoints.length) {
            this.lines = BABYLON.MeshBuilder.CreateLines('unitMovementPath', {points: this.plannedMovementPoints}, scene);
        }
    }
    
    public recalculate(): void {
        this.lines?.dispose();
        this.create(sceneManager().currentBabylonScene);
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
