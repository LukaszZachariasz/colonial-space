import * as BABYLON from 'babylonjs';
import {Injector} from '@colonial-space/core/injector/injector';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {SimpleModel} from '../../../../core/scene-manager/model/model-elements/simple-model';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../game-logic/store/map/square/square.state';
import {selectSquares} from '../../game-logic/store/map/square/square.selectors';

export class MapModel extends SimpleModel<BABYLON.TransformNode> {
    public squareModels: SquareModel[] = [];

    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public onCreate(): void {
        this.mesh = new BABYLON.TransformNode('Map', this.scene);
        selectSquares().flat().forEach((squareState: SquareState) => {
            this.squareModels.push(Injector.inject(ModelManager).addSimpleModel(new SquareModel(this.scene, squareState)));
        });

        this.squareModels.forEach((el: SquareModel) => el.mesh.parent = this.mesh);
    }
}
