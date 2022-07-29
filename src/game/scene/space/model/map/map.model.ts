import * as BABYLON from 'babylonjs';
import {SimpleModel} from '../../../../../engine/model-manager/model-elements/simple-model';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../../../logic/store/map/square/square.state';
import {modelManager} from 'engine';
import {selectSquares} from '../../../../logic/store/map/square/square.selectors';

export class MapModel extends SimpleModel<BABYLON.TransformNode> {
    public squareModels: SquareModel[] = [];

    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
        this.mesh = new BABYLON.TransformNode('Map', this.scene);
        selectSquares().flat().forEach((squareState: SquareState) => {
            this.squareModels.push(modelManager().addSimpleModel(new SquareModel(this.scene, squareState)));
        });

        this.squareModels.forEach((el: SquareModel) => el.mesh.parent = this.mesh);
    }
}
