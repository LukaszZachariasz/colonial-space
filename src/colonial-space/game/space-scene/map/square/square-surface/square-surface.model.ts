import * as BABYLON from 'babylonjs';
import {Injector} from '@colonial-space/core/injector/injector';
import {SelectedTerritoryService} from '../../../../game-logic/territory/selected-territory.service';
import {SelectedUnitService} from '../../../../game-logic/unit/selected-unit.service';
import {SimpleModel} from '../../../../../core/model-manager/model-elements/simple-model';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../game-logic/store/map/square/square.state';
import {UnitMovementService} from '../../../../game-logic/unit/unit-movement.service';

export class SquareSurfaceModel extends SimpleModel<BABYLON.Mesh>{

    private material: BABYLON.StandardMaterial;

    constructor(private scene: BABYLON.Scene,
                private state: SquareState) {
        super();
    }

    public onCreate(): void {
        this.mesh = BABYLON.MeshBuilder.CreatePlane('SquareSurface', {
            width: SquareModel.SquareEdgeSize,
            height: SquareModel.SquareEdgeSize
        }, this.scene);
        this.mesh.rotation.x = Math.PI / 2;
        this.material = new BABYLON.StandardMaterial('SquarePolygonMaterial', this.scene);
        this.material.alpha = 0;
        this.mesh.material = this.material;

        const actionManager: BABYLON.ActionManager = new BABYLON.ActionManager(this.scene);
        this.mesh.actionManager = actionManager;

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnLeftPickTrigger, () => {
                Injector.inject(SelectedUnitService).deselect();
                Injector.inject(SelectedTerritoryService).deselect();
            })
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                if (Injector.inject(SelectedUnitService).selectedUnitId$.value) {
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
                Injector.inject(UnitMovementService).handleMovement(this.state.id);
            })
        );
    }
}
