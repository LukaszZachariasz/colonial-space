import * as BABYLON from 'babylonjs';
import {
    ModelResource
} from '@colonial-space/core/module/scene/model/from-file/model-resource.decorator';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../game-logic/store/map/square/square.selectors';

@ModelResource({
    name: 'ColonialShipModel',
    meshUrl: 'resources/unit/colonial-ship/',
    meshName: 'colonial_ship_01.glb'
})
export class ColonialShipModel extends UnitModel implements OnLoad {
    constructor(protected state: UnitState) {
        super(state);
    }

    public gameOnLoad(): void {
        this.primaryMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);
        super.gameOnLoad();
    }
}
