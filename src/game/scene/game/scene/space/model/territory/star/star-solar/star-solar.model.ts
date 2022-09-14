import * as BABYLON from 'babylonjs';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {GameObjectFromFile} from '../../../../../../logic/game-object/game-object';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SquareState} from '../../../../../../logic/store/map/square/square.state';
import {TerritoryModel} from '../../territory.model';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TerritoryType} from '../../../../../../logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../../logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'StarSolarModel',
    meshUrl: 'resources/territory/star/star-solar/',
    meshName: 'star_01.glb'
})
export class StarSolarModel extends TerritoryModel implements OnReady, OnInit {
    public type: TerritoryType = TerritoryType.STAR_SOLAR;
    public square: SquareState = selectSquareByTerritoryId(this.state.id);

    constructor(public scene: BABYLON.Scene,
                public state: TerritoryState) {
        super(scene, state);
    }

    public gameOnInit(): void {
        this.primaryMesh.position = new BABYLON.Vector3(this.square.x, 5, this.square.y);
    }

    public gameOnReady(): void {
        super.gameOnReady();
    }
}
