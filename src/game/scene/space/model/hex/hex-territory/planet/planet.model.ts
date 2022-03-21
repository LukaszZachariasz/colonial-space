import * as BABYLON from 'babylonjs';
import {HexTerritoryModel} from '../hex-territory.model';
import {HexTerritoryType} from '../../../../../../store/map/hex/hex-territory/hex-territory-type';

export class PlanetModel extends HexTerritoryModel {
    public type: HexTerritoryType = HexTerritoryType.PLANET;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/planet/', 'planet_01.gltf', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(this.position.x, 1, this.position.y);
        });
    }
}
