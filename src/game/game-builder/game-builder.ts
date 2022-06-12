import * as BABYLON from 'babylonjs';
import {MapModel} from '../scene/space/model/map/map.model';
import {SpaceScene} from '../scene/space/space.scene';
import {TerritoryFactory} from './territory-factory/territory-factory';
import {TerritoryState} from '../logic/store/territory/territory.state';
import {UnitFactory} from './unit-factory/unit-factory';
import {UnitState} from '../logic/store/unit/unit.state';
import {modelManager, sceneManager} from 'engine';
import {selectPlayerId} from '../logic/store/player/player.selectors';
import {selectPlayerSquares, selectSquareByTerritoryId} from '../logic/store/map/square/square.selectors';
import {selectTerritories} from '../logic/store/territory/territory.selectors';
import {selectUnits} from '../logic/store/unit/unit.selectors';

export class GameBuilder {
    public build(): void {
        const spaceScene = new SpaceScene();
        sceneManager().register(spaceScene);
        modelManager().addModel(new MapModel(spaceScene.scene));

        selectTerritories()
            .filter((el: TerritoryState) => !selectSquareByTerritoryId(el.id).fogOfWar)
            .forEach((territoryState: TerritoryState) => TerritoryFactory.create(spaceScene.scene, territoryState));

        selectUnits().forEach((unitState: UnitState) => UnitFactory.create(spaceScene.scene, unitState));

        this.setCameraTargetToFirstTerritory(spaceScene);
    }

    private setCameraTargetToFirstTerritory(spaceScene: SpaceScene): void {
        const playerSquare = selectPlayerSquares(selectPlayerId())[0];
        spaceScene.camera.setTarget(new BABYLON.Vector3(playerSquare.x, spaceScene.camera.target.y, playerSquare.y));
    }
}
