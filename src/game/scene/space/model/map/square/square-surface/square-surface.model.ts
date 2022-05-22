import * as BABYLON from 'babylonjs';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {logic} from '../../../../../../game';

export class SquareSurfaceModel {
    public plane: BABYLON.Mesh;

    private material: BABYLON.StandardMaterial;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        this.plane = BABYLON.MeshBuilder.CreatePlane('SquareSurface', {
            width: SquareModel.SquareEdgeSize,
            height: SquareModel.SquareEdgeSize
        }, this.scene);
        this.plane.rotation.x = Math.PI / 2;
        this.material = new BABYLON.StandardMaterial('SquarePolygonMaterial', this.scene);
        this.material.alpha = 0;
        this.plane.material = this.material;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(this.scene);
        this.plane.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                logic().selectedUnitService.deselect();
                logic().selectedTerritoryService.deselect();
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
                logic().unitMovementService.handleMovement(this.state.id);
            })
        );
    }
}
