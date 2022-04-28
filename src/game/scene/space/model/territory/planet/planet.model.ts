import * as BABYLON from 'babylonjs';
import {SquareState} from '../../../../../logic/store/map/square/square.state';
import {TerritoryModel} from '../territory.model';
import {TerritoryType} from '../../../../../logic/store/territory/territory-type';
import {selectSquareByTerritoryId} from '../../../../../logic/store/map/square/square.selectors';

export class PlanetModel extends TerritoryModel {
    public type: TerritoryType = TerritoryType.PLANET;
    public square: SquareState = selectSquareByTerritoryId(this.id);

    constructor(private scene: BABYLON.Scene,
                public id: string) {
        super(id);

        BABYLON.SceneLoader.ImportMesh('', 'resources/territory/planet/', 'planet_01.glb', scene, (meshes: BABYLON.AbstractMesh[]) => {
            meshes[0].position = new BABYLON.Vector3(this.square.x, 0, this.square.y);
        });
    }
}
