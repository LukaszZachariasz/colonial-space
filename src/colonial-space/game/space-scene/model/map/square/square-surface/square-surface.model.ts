import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelMesh} from '@colonial-space/core/module/scene/model/mesh/model-mesh';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SelectionService} from '../../../../../game-logic/selection/selection.service';
import {SelectionUnitService} from '../../../../../game-logic/selection/unit/selection-unit.service';
import {SquareModel} from '../square.model';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {UnitMovementService} from '../../../../../game-logic/unit/unit-movement.service';

export class SquareSurfaceModel extends ModelMesh<BABYLON.Mesh> implements OnInit {
    @Inject(SelectionService) private selectionService: SelectionService;
    @Inject(SelectionUnitService) private selectionUnitService: SelectionUnitService;
    @Inject(UnitMovementService) private unitMovementService: UnitMovementService;
    @Inject(SCENE) private scene: BABYLON.Scene;

    private material: BABYLON.StandardMaterial;

    constructor(private state: SquareState) {
        super();
    }

    public gameOnInit(): void {
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
                this.selectionService.deselectAll();
            })
        );

        actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                if (this.selectionUnitService.selectedUnitId$.value) {
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
                this.unitMovementService.handleMovement(this.state.id);
            })
        );
    }
}
