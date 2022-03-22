import * as BABYLON from 'babylonjs';
import {selectHexById} from '../../../../../store/map/hex/hex.selectors';
import {ScoutShipState} from '../../../../../store/unit/scout/scout-ship.state';
import {UnitModel} from '../unit.model';

export class ScoutShipModel extends UnitModel {
    public artUrl = 'resources/unit/scout-ship/scout-ship-art.png';
    public state: ScoutShipState;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/unit/scout-ship/', 'scout-ship.obj', scene, (meshes: BABYLON.AbstractMesh[]) => {
            this.meshes = meshes;
            this.afterModelLoaded(scene);
        });
    }

    public afterModelLoaded(scene: BABYLON.Scene): void {
        this.meshes.forEach((mesh: BABYLON.AbstractMesh) => {
            mesh.position = new BABYLON.Vector3(selectHexById(this.state.hexId).x, 2, selectHexById(this.state.hexId).y);
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
