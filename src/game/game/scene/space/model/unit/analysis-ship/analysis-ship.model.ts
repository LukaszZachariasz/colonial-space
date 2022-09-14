import * as BABYLON from 'babylonjs';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {GameObjectFromFile} from '../../../../../logic/game-object/game-object';
import {OnReady} from '../../../../../../../core/lifecycle/on-ready/on-ready';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../../logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'AnalysisShipModel',
    meshUrl: 'resources/unit/analysis-ship/',
    meshName: 'analysis_ship_01.glb'
})
export class AnalysisShipModel extends UnitModel implements OnReady, AfterCreated {
    constructor(protected scene: BABYLON.Scene,
                protected state: UnitState) {
        super(scene, state);
    }

    public gameAfterCreated(): void {
        super.gameAfterCreated();
    }

    public gameOnReady(): void {
        this.actionMesh = this.primaryMesh.getChildMeshes().find((el: BABYLON.AbstractMesh) => el.name.toLowerCase().includes('body'));
        this.primaryMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);
        super.gameOnReady();
    }
}
