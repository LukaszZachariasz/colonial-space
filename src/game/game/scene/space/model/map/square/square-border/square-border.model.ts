import * as BABYLON from 'babylonjs';
import {SimpleModel} from '../../../../../../../core/model-manager/model-elements/simple-model';
import {SquareModel} from '../square.model';
import {selectPlayerColor} from '../../../../../../logic/store/player/player.selectors';

export class SquareBorderModel extends SimpleModel<BABYLON.LinesMesh>{
    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
        this.mesh = BABYLON.MeshBuilder.CreateLines('SquareBorder', {points: this.generateSquarePolygon()}, this.scene);
        this.mesh.alpha = 0.05;
    }

    public setPlayer(): void {
        this.mesh.color = BABYLON.Color3.FromHexString(selectPlayerColor());
        this.mesh.alpha = 1;
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
