import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '@colonial-space/core/module/scene/model/game-object';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../game-logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../game-logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'AnalysisShipModel',
    meshUrl: 'resources/unit/analysis-ship/',
    meshName: 'analysis_ship_01.glb'
})
export class AnalysisShipModel extends UnitModel implements OnLoad {
    constructor(protected state: UnitState) {
        super(state);
    }

    public gameOnLoad(): void {
        this.actionMesh = this.primaryMesh.getChildMeshes().find((el: BABYLON.AbstractMesh) => el.name.toLowerCase().includes('body'));
        this.primaryMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);
        super.gameOnLoad();
    }
}
