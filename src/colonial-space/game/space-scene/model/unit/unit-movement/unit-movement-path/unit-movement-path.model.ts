import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelMesh} from '@colonial-space/core/module/scene/model/mesh/model-mesh';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {
    selectSquareById,
    selectSquareByUnitId
} from '../../../../../game-logic/store/map/square/square.selectors';
import {selectUnitById} from '../../../../../game-logic/store/unit/unit.selectors';

export class UnitMovementPathModel extends ModelMesh<BABYLON.LinesMesh> implements OnInit {
    @Inject(SCENE) private scene: BABYLON.Scene;
    private plannedMovementPoints: BABYLON.Vector3[] = [];
    private readonly inTourColor: BABYLON.Color3 = new BABYLON.Color3(0, 1, 0);
    private readonly notInTourColor: BABYLON.Color3 = new BABYLON.Color3(0.5, 0.5, 0.5);
    private highlightLinesLayer: BABYLON.HighlightLayer;

    constructor(private id: string) {
        super();
    }

    public gameOnInit(): void {
        this.createPlannedMovementPoints();

        if (this.plannedMovementPoints.length) {
            const unit = selectUnitById(this.id);

            this.mesh = BABYLON.MeshBuilder.CreateLines('unitMovementPath', {
                points: this.plannedMovementPoints,
                colors: this.plannedMovementPoints.map((el: BABYLON.Vector3, i: number) => {
                    if (i < unit.movementPointsLeft) {
                        return BABYLON.Color4.FromColor3(this.inTourColor);
                    } else {
                        return BABYLON.Color4.FromColor3(this.notInTourColor);
                    }
                }),
                useVertexAlpha: false
            }, this.scene);


            this.highlightLinesLayer = new BABYLON.HighlightLayer('lines_path_highlight', this.scene);
            this.highlightLinesLayer.addMesh(this.mesh, BABYLON.Color3.Yellow());
        }
    }

    public recalculate(): void {
        this.highlightLinesLayer.dispose();
        this.mesh?.dispose();
        this.gameOnInit();
    }

    private createPlannedMovementPoints(): void {
        const startSquare: SquareState = selectSquareByUnitId(this.id);

        this.plannedMovementPoints = [];
        this.plannedMovementPoints.push(new BABYLON.Vector3(startSquare.x, 0, startSquare.y));
        selectUnitById(this.id).movementPlanning.forEach((squareId: string) => {
            this.plannedMovementPoints.push(
                new BABYLON.Vector3(selectSquareById(squareId).x, 0, selectSquareById(squareId).y)
            );
        });
    }
}
