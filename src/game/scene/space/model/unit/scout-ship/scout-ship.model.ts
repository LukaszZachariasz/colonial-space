import * as BABYLON from 'babylonjs';
import {ScoutShipState} from '../../../../../store/unit/scout/scout-ship.state';
import {UnitModel} from '../unit.model';

export class ScoutShipModel extends UnitModel {
    public artUrl = 'resources/unit/scout-ship/scout-ship-art.png';
    private actionManager: BABYLON.ActionManager;

    constructor(public state: ScoutShipState) {
        super(state);
    }

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            scene,
            (meshes: BABYLON.AbstractMesh[]) => {
                this.transformMesh = meshes[0];
                this.actionMesh = meshes[0].getChildMeshes()[0];
                this.meshes = meshes;
                super.initialize();
                this.afterModelLoaded(scene);
            });
    }

    public afterModelLoaded(scene: BABYLON.Scene): void {
        this.actionManager = new BABYLON.ActionManager(scene);
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
