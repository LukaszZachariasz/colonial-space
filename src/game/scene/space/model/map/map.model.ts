import * as BABYLON from 'babylonjs';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../../../logic/store/map/square/square.state';
import {selectSquares} from '../../../../logic/store/map/square/square.selectors';

export class MapModel {
    public mapNode: BABYLON.TransformNode;

    constructor(private scene: BABYLON.Scene) {
        this.mapNode = new BABYLON.TransformNode('Map', this.scene);
        this.createSquares();
    }

    private createSquares(): void {
        selectSquares().flat().forEach((squareState: SquareState) => {
            const square = new SquareModel(this.scene, squareState);
            square.squareNode.parent = this.mapNode;
        });
    }
}