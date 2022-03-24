import * as BABYLON from 'babylonjs';
import {Model} from '../model';
import {SquareLinesModel} from './square-lines/square-lines.model';
import {SquarePolygonModel} from './square-polygon/square-polygon.model';
import {SquareState} from '../../../../store/map/square/square.state';

export class SquareModel implements Model {
    public static readonly SquareEdgeWidth = 10;

    public state: SquareState;

    private readonly squarePoints: BABYLON.Vector3[];
    private squareLines: SquareLinesModel;
    private squarePolygon: SquarePolygonModel;

    constructor(private position: BABYLON.Vector2) {
        this.squarePoints = this.generateSquarePolygon();
    }

    public create(scene: BABYLON.Scene): void {
        this.squareLines = new SquareLinesModel(this.squarePoints);
        this.squarePolygon = new SquarePolygonModel(this.state.id, this.squarePoints);

        if (this.state.playerId) {
            this.squareLines.playerId = this.state.playerId;
        }

        this.squareLines.create(scene);
        this.squarePolygon.create(scene);
    }

    private generateSquarePolygon(): BABYLON.Vector3[] {
        return [
            new BABYLON.Vector3(this.position.x - SquareModel.SquareEdgeWidth / 2, 0, this.position.y - SquareModel.SquareEdgeWidth / 2),
            new BABYLON.Vector3(this.position.x + SquareModel.SquareEdgeWidth / 2, 0, this.position.y - SquareModel.SquareEdgeWidth / 2),
            new BABYLON.Vector3(this.position.x + SquareModel.SquareEdgeWidth / 2, 0, this.position.y + SquareModel.SquareEdgeWidth / 2),
            new BABYLON.Vector3(this.position.x - SquareModel.SquareEdgeWidth / 2, 0, this.position.y + SquareModel.SquareEdgeWidth / 2),
            new BABYLON.Vector3(this.position.x - SquareModel.SquareEdgeWidth / 2, 0, this.position.y - SquareModel.SquareEdgeWidth / 2)
        ];
    }
}
