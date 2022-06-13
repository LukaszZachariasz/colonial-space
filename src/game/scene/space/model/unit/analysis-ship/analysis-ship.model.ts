import * as BABYLON from 'babylonjs';
import {OnReady} from '../../../../../../engine/lifecycle/on-ready/on-ready';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../../logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

export class AnalysisShipModel extends UnitModel implements OnReady {
    private actionManager: BABYLON.ActionManager;

    constructor(protected scene: BABYLON.Scene,
                protected state: UnitState) {
        super(scene, state);
    }

    public onImport(): Promise<BABYLON.ISceneLoaderAsyncResult> {
        return BABYLON.SceneLoader.ImportMeshAsync(
            '',
            'resources/unit/analysis-ship/',
            'analysis_ship_01.glb',
            this.scene);
    }

    public gameOnReady(): void {
        this.actionMesh = this.mesh.getChildMeshes().find((el: BABYLON.AbstractMesh) => el.name.toLowerCase().includes('body'));
        this.mesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x + 3, 2, selectSquareByUnitId(this.state.id).y - 4);

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
}
