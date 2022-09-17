import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/scene-manager/model/game-object';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SquareState} from '../../../../../game-logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../game-logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'PlanetSandModel',
    meshUrl: 'resources/territory/planet/planet-sand/',
    meshName: 'planet_01.glb'
})
export class PlanetSandModel extends TerritoryModel implements OnLoad {
    public type: TerritoryType = TerritoryType.PLANET_SAND;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    constructor(public state: TerritoryState) {
        super(state);
    }

    public gameOnLoad(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 0, this.square.y);
        super.gameOnLoad();
    }
}
