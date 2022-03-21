import * as BABYLON from 'babylonjs';
import {HexTerritoryType} from '../../../../../store/map/hex/hex-territory/hex-territory-type';
import {ScoutShipState} from '../../../../../store/unit/scout/scout-ship.state';
import {UnitModel} from '../unit.model';

export class ScoutShipModel extends UnitModel {
    public type: HexTerritoryType = HexTerritoryType.PLANET;
    public state: ScoutShipState;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/hex/hex-territory/planet/', 'planet_01.gltf', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(0, 1, 0);
        });
    }
}
