import * as BABYLON from 'babylonjs';
import {Inject} from '@colonial-space/core/injector/inject';
import {Model} from '@colonial-space/core/scene-manager/model/model-elements/model';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../game-logic/store/map/square/square.state';
import {selectSquares} from '../../game-logic/store/map/square/square.selectors';

export class MapModel extends Model<BABYLON.TransformNode> implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;
    
    public squareModels: SquareModel[] = [];

    constructor(private scene: BABYLON.Scene) {
        super();
    }

    public gameOnInit(): void {
        this.mesh = new BABYLON.TransformNode('Map', this.scene);
        selectSquares().flat().forEach((squareState: SquareState) => {
            this.squareModels.push(this.modelManager.addModel(new SquareModel(this.scene, squareState)));
        });

        this.squareModels.forEach((el: SquareModel) => el.mesh.parent = this.mesh);
    }
}
