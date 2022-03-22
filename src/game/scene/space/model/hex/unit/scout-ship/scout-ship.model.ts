import * as BABYLON from 'babylonjs';
import {HexTerritoryType} from '../../../../../../store/map/hex/hex-territory/hex-territory-type';
import {ScoutShipState} from '../../../../../../store/map/hex/unit/scout/scout-ship.state';
import {UnitModel} from '../unit.model';

export class ScoutShipModel extends UnitModel {
    public type: HexTerritoryType = HexTerritoryType.PLANET;
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
            mesh.position = this.position;
            mesh.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);
            mesh.position.y = 1;
            mesh.position.x += 0.2;
            mesh.position.z += 0.2;

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
