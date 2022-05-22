import * as BABYLON from 'babylonjs';
import {UnitModel} from '../unit.model';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

export class ScoutShipModel extends UnitModel {
    public artUrl = 'resources/unit/scout-ship/scout-ship-art.png';
    private actionManager: BABYLON.ActionManager;

    constructor(protected scene: BABYLON.Scene,
                protected id: string) {
        super(scene, id);
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            scene,
            (meshes: BABYLON.AbstractMesh[]) => {
                this.transformMesh = meshes[0];
                this.actionMesh = meshes[0].getChildMeshes()[0];
                this.meshes = meshes;
                this.transformMesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.id).x + 3, 2, selectSquareByUnitId(this.id).y - 4);
                this.afterModelLoaded();
            });
    }

    public afterModelLoaded(): void {
        super.afterModelLoaded();

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
