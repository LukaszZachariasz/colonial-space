import * as BABYLON from 'babylonjs';
import {UnitModel} from '../unit.model';
import {selectSquareByUnitId} from '../../../../../logic/store/map/square/square.selectors';

export class ScoutShipModel extends UnitModel {
    public artUrl = 'resources/unit/scout-ship/scout-ship-art.png';
    private actionManager: BABYLON.ActionManager;

    constructor(public id: string) {
        super(id);
    }

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/unit/scout-ship/', 'scout-ship.obj', scene, (meshes: BABYLON.AbstractMesh[]) => {
            this.meshes = meshes;
            super.initialize();
            this.afterModelLoaded(scene);
        });
    }

    public afterModelLoaded(scene: BABYLON.Scene): void {
        this.meshes.forEach((mesh: BABYLON.AbstractMesh) => {
            mesh.position = new BABYLON.Vector3(selectSquareByUnitId(this.id).x, 2, selectSquareByUnitId(this.id).y);
            mesh.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
            mesh.position.x += 1.5;
            mesh.position.z += 1.5;

            this.actionManager = new BABYLON.ActionManager(scene);
            this.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                    mesh.enableEdgesRendering();
                    mesh.edgesWidth = 1.0;
                    mesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
                })
            );

            this.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                    this.select();
                })
            );

            this.actionManager.registerAction(
                new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                    mesh.disableEdgesRendering();
                })
            );
            mesh.actionManager = this.actionManager;
        });
    }
}
