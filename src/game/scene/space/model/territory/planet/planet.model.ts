import * as BABYLON from 'babylonjs';
import {TerritoryModel} from '../territory.model';
import {TerritoryType} from '../../../../../store/territory/territory-type';
import {selectSquareById} from '../../../../../store/map/square/square.selectors';

export class PlanetModel extends TerritoryModel {
    public type: TerritoryType = TerritoryType.PLANET;

    public create(scene: BABYLON.Scene): void {
        BABYLON.SceneLoader.ImportMesh('', 'resources/territory/planet/', 'planet_01.gltf', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(selectSquareById(this.state.squareId).x, 0, selectSquareById(this.state.squareId).y);
        });
    }
}
