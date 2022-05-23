import * as BABYLON from 'babylonjs';
import {MapModel} from '../scene/space/model/map/map.model';
import {PlanetModel} from '../scene/space/model/territory/planet/planet.model';
import {ScoutShipModel} from '../scene/space/model/unit/scout-ship/scout-ship.model';
import {SpaceScene} from '../scene/space/space.scene';
import {TerritoryState} from '../logic/store/territory/territory.state';
import {UnitState} from '../logic/store/unit/unit.state';
import {sceneManager} from 'engine';
import {selectPlayerId} from '../logic/store/player/player.selectors';
import {selectPlayerSquares} from '../logic/store/map/square/square.selectors';
import {selectTerritories} from '../logic/store/territory/territory.selectors';
import {selectUnits} from '../logic/store/unit/unit.selectors';

export class GameBuilder {
    public build(): void {
        const spaceScene = new SpaceScene();
        sceneManager().register(spaceScene);
        new MapModel(spaceScene.scene);

        selectTerritories().forEach((territoryState: TerritoryState) => new PlanetModel(spaceScene.scene, territoryState));
        selectUnits().forEach((unitState: UnitState) => new ScoutShipModel(spaceScene.scene, unitState));

        this.setCameraTargetToFirstTerritory(spaceScene);
    }

    private setCameraTargetToFirstTerritory(spaceScene: SpaceScene): void {
        const playerSquare = selectPlayerSquares(selectPlayerId())[0];
        spaceScene.camera.setTarget(new BABYLON.Vector3(playerSquare.x, spaceScene.camera.target.y, playerSquare.y));
    }
}
