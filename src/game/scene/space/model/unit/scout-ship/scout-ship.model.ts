import * as BABYLON from 'babylonjs';
import {GameObjectFromFile} from '../../../../../logic/game-object/game-object';
import {ImportModelAbstract} from '../../../../../../engine/model-manager/model-elements/import-model';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../../logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

@GameObjectFromFile({
    name: 'ScoutShipModel',
    meshUrl: 'resources/unit/scout-ship/',
    meshName: 'scout_ship_01.glb'
})
export class ScoutShipModel extends UnitModel implements ImportModelAbstract {
    private actionManager: BABYLON.ActionManager;

    constructor(protected scene: BABYLON.Scene,
                protected state: UnitState) {
        super(scene, state);
    }

    public onImport(): Promise<BABYLON.ISceneLoaderAsyncResult> {
        throw new Error('Method not implemented.');
    }

    public gameAfterCreated(): void {
        this.actionMesh = this.meshes[0].getChildMeshes()[0];
        this.meshes[0].position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);

        super.gameOnReady();

        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                this.actionMesh.enableEdgesRendering();
                this.actionMesh.edgesWidth = 1.0;
                this.actionMesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.select();
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                this.actionMesh.disableEdgesRendering();
            })
        );
        this.actionMesh.actionManager = this.actionManager;
    }

    public gameOnReady(): void {

    }
}
