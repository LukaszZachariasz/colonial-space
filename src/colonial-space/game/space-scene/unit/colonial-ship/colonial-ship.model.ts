import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/scene-manager/model/game-object';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../game-logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'ColonialShipModel',
    meshUrl: 'resources/unit/colonial-ship/',
    meshName: 'colonial_ship_01.glb'
})
export class ColonialShipModel extends UnitModel implements OnLoad, OnInit {
    constructor(protected scene: BABYLON.Scene,
                protected state: UnitState) {
        super(scene, state);
    }

    public gameOnInit(): void {
        super.gameOnInit();
    }

    public gameOnLoad(): void {
        this.primaryMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);
        super.gameOnLoad();
    }
}
