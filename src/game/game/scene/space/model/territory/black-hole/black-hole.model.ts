import * as BABYLON from 'babylonjs';
import {AfterCreated} from '@colonial-space/core/lifecycle/after-created/after-created';
import {GameObjectFromFile} from '../../../../../logic/game-object/game-object';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {TerritoryModel} from '../territory.model';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'BlackHoleModel',
    meshUrl: 'resources/territory/black-hole/',
    meshName: 'black-hole_01.glb'
})
export class BlackHoleModel extends TerritoryModel implements OnReady, AfterCreated {
    public type: TerritoryType = TerritoryType.BLACK_HOLE;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);
    }

    public gameAfterCreated(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 5, this.square.y);
    }

    public gameOnReady(): void {
        super.gameOnReady();
    }
}
