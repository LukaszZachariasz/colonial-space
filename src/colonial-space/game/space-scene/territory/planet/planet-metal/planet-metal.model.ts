import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/scene-manager/model/game-object';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {SquareState} from '../../../../game-logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../game-logic/store/territory/territory.state';
import {TerritoryType} from '../../../../game-logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'PlanetMetalModel',
    meshUrl: 'resources/territory/planet/planet-metal/',
    meshName: 'planet_01.glb'
})
export class PlanetMetalModel extends TerritoryModel implements OnLoad, OnInit {
    public type: TerritoryType = TerritoryType.PLANET_METAL;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);
    }

    public gameOnInit(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 0, this.square.y);
    }

    public gameOnLoad(): void {
        super.gameOnLoad();
    }
}
