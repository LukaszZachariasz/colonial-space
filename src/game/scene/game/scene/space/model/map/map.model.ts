import * as BABYLON from 'babylonjs';
import {Container} from 'typedi';
import {ModelManagerService} from '../../../../../../core/model-manager/model-manager.service';
import {SimpleModel} from '../../../../../../core/model-manager/model-elements/simple-model';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../../../logic/store/map/square/square.state';
import {selectSquares} from '../../../../logic/store/map/square/square.selectors';

export class MapModel extends SimpleModel<BABYLON.TransformNode> {
    public squareModels: SquareModel[] = [];

    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
        this.mesh = new BABYLON.TransformNode('Map', this.scene);
        selectSquares().flat().forEach((squareState: SquareState) => {
            this.squareModels.push(Container.get(ModelManagerService).addSimpleModel(new SquareModel(this.scene, squareState)));
        });

        this.squareModels.forEach((el: SquareModel) => el.mesh.parent = this.mesh);
    }
}
