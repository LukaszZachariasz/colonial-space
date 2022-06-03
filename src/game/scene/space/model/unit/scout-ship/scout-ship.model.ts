import * as BABYLON from 'babylonjs';
import {UnitModel} from '../unit.model';
import {UnitState} from '../../../../../logic/store/unit/unit.state';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

export class ScoutShipModel extends UnitModel {
    private actionManager: BABYLON.ActionManager;

    constructor(protected scene: BABYLON.Scene,
                protected state: UnitState) {
        super(scene, state);
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            scene,
            (meshes: BABYLON.AbstractMesh[]) => {
                this.transformMesh = meshes[0];
                this.actionMesh = meshes[0].getChildMeshes()[0];
                this.meshes = meshes;
                this.transformMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.state.id).x, 0, selectSquareByUnitId(this.state.id).y);
                this.afterModelLoaded();
            });
    }

    public afterModelLoaded(): void {
        super.afterModelLoaded();

        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                this.actionMesh.overlayColor = new BABYLON.Color3(0.1, 1, 0.2);
                this.actionMesh.overlayAlpha = 0.3;
                this.actionMesh.renderOverlay = true;
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.select();
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                this.actionMesh.renderOverlay = false;
            })
        );
        this.actionMesh.actionManager = this.actionManager;
    }
}
