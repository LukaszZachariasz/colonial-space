import * as BABYLON from 'babylonjs';
import {SquareModel} from '../square.model';
import {selectPlayerColor} from '../../../../../../logic/store/player/player.selectors';

export class SquareBorderModel {
    public lines: BABYLON.LinesMesh;

    constructor(private scene: BABYLON.Scene) {
        this.lines = BABYLON.MeshBuilder.CreateLines('SquareBorder', {points: this.generateSquarePolygon()}, this.scene);
        this.lines.alpha = 0.05;
    }

    public setPlayer(): void {
        this.lines.color = BABYLON.Color3.FromHexString(selectPlayerColor());
        this.lines.alpha = 1;
    }

    private generateSquarePolygon(): BABYLON.Vector3[] {
        return [
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(SquareModel.SquareEdgeSize / 2, 0, -SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, -SquareModel.SquareEdgeSize / 2),
            new BABYLON.Vector3(-SquareModel.SquareEdgeSize / 2, 0, SquareModel.SquareEdgeSize / 2)
        ];
    }
}
