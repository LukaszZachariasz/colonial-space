import * as BABYLON from 'babylonjs';
import {TerritoryModel} from '../territory.model';
import {TerritoryType} from '../../../../../store/territory/territory-type';
import {selectHexById} from '../../../../../store/map/hex/hex.selectors';

export class PlanetModel extends TerritoryModel {
    public type: TerritoryType = TerritoryType.PLANET;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/hex/hex-territory/planet/', 'planet_01.gltf', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(selectHexById(this.state.hexId).x, 0, selectHexById(this.state.hexId).y);
        });
    }
}
