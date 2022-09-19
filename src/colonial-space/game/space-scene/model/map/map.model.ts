import * as BABYLON from 'babylonjs';
import {GalaxyDustModel} from './galaxy-dust/galaxy-dust.model';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/module/scene/model/model-manager';
import {ModelNode} from '@colonial-space/core/module/scene/model/node/model-node';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';
import {SquareModel} from './square/square.model';
import {SquareState} from '../../../game-logic/store/map/square/square.state';
import {selectSquares} from '../../../game-logic/store/map/square/square.selectors';

export class MapModel extends ModelNode<BABYLON.TransformNode> implements OnInit {
    @Inject(ModelManager) private modelManager: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;

    public squareModels: SquareModel[] = [];
    public galaxyDustModel: GalaxyDustModel;

    public gameOnInit(): void {
        this.node = new BABYLON.TransformNode('Map', this.scene);

        selectSquares().flat().forEach((squareState: SquareState) => {
            this.squareModels.push(this.modelManager.create(SquareModel, squareState));
        });
        this.squareModels.forEach((el: SquareModel) => el.node.parent = this.node);

        this.galaxyDustModel = this.modelManager.create(GalaxyDustModel);
        this.galaxyDustModel.particleSystem.minEmitBox = this.squareModels.flat()[0].node.position;
        this.galaxyDustModel.particleSystem.maxEmitBox = this.squareModels.flat()[this.squareModels.flat().length -1].node.position;
    }
}
