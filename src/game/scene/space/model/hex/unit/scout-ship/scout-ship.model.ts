import * as BABYLON from 'babylonjs';
import {HexTerritoryType} from '../../../../../../store/map/hex/hex-territory/hex-territory-type';
import {ScoutShipState} from '../../../../../../store/map/hex/unit/scout/scout-ship.state';
import {UnitModel} from '../unit.model';

export class ScoutShipModel extends UnitModel {
    public type: HexTerritoryType = HexTerritoryType.PLANET;
    public state: ScoutShipState;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/unit/scout-ship/', 'scout-ship.obj', scene, (meshes: BABYLON.AbstractMesh[]) => {
            this.mesh = meshes[0];
            this.afterModelLoaded(scene);
        });
    }

    public afterModelLoaded(scene: BABYLON.Scene): void {
        this.mesh.position = this.position;
        this.mesh.position.y = 1.5;
        this.mesh.position.x += 2;
        this.mesh.position.z += 2;
        this.mesh.scaling = new BABYLON.Vector3(0.25, 0.25, 0.25);

        this.actionManager = new BABYLON.ActionManager(scene);
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, () => {
                this.mesh.enableEdgesRendering();
                this.mesh.edgesWidth = 4.0;
                this.mesh.edgesColor = new BABYLON.Color4(0, 0, 1, 1);
            })
        );

        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, () => {
                this.mesh.disableEdgesRendering();
            })
        );
        this.mesh.actionManager = this.actionManager;
    }
}
