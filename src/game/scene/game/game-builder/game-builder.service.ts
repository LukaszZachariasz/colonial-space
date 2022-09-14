import * as BABYLON from 'babylonjs';
import {MapModel} from '../scene/space/model/map/map.model';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {SceneManagerService} from '../../../core/scene-manager/scene-manager.service';
import {Service} from 'typedi';
import {SpaceScene} from '../scene/space/space.scene';
import {TerritoryFactoryService} from './territory-factory/territory-factory.service';
import {TerritoryState} from '../logic/store/territory/territory.state';
import {UnitFactoryService} from './unit-factory/unit-factory.service';
import {UnitState} from '../logic/store/unit/unit.state';
import {selectPlayerId} from '../logic/store/player/player.selectors';
import {selectPlayerSquares, selectSquareByTerritoryId} from '../logic/store/map/square/square.selectors';
import {selectTerritories} from '../logic/store/territory/territory.selectors';
import {selectUnits} from '../logic/store/unit/unit.selectors';

@Service()
export class GameBuilderService {
    constructor(private sceneManagerService: SceneManagerService,
                private modelManagerService: ModelManagerService,
                private territoryFactoryService: TerritoryFactoryService,
                private unitFactoryService: UnitFactoryService) {
    }
    
    public build(): void {
        const spaceScene = new SpaceScene();
        this.sceneManagerService.register(spaceScene);
        this.modelManagerService.addSimpleModel(new MapModel(spaceScene.scene));

        selectTerritories()
            .filter((el: TerritoryState) => !selectSquareByTerritoryId(el.id).fogOfWar)
            .forEach((territoryState: TerritoryState) => this.territoryFactoryService.create(spaceScene.scene, territoryState));

        selectUnits().forEach((unitState: UnitState) => this.unitFactoryService.create(spaceScene.scene, unitState));

        this.setCameraTargetToFirstTerritory(spaceScene);
    }

    private setCameraTargetToFirstTerritory(spaceScene: SpaceScene): void {
        const playerSquare = selectPlayerSquares(selectPlayerId())[0];
        spaceScene.camera.setTarget(new BABYLON.Vector3(playerSquare.x, spaceScene.camera.target.y, playerSquare.y));
    }
}
