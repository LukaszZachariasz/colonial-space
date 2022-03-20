import * as BABYLON from 'babylonjs';
import {HexTerritoryModel} from '../hex-territory.model';
import {HexTerritoryTypeEnum} from '../hex-territory-type.enum';

export class PlanetModel extends HexTerritoryModel {
    public type: HexTerritoryTypeEnum = HexTerritoryTypeEnum.PLANET;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/planet/', 'planet_01.gltf', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(this.position.x, 1, this.position.y);
        });
    }
}
