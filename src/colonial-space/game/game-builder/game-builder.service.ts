import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {MapModel} from '../space-scene/map/map.model';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {TerritoryFactoryService} from './territory-factory/territory-factory.service';
import {TerritoryState} from '../game-logic/store/territory/territory.state';
import {UnitFactoryService} from './unit-factory/unit-factory.service';
import {UnitState} from '../game-logic/store/unit/unit.state';
import {selectPlayerId} from '../game-logic/store/player/player.selectors';
import {selectPlayerSquares, selectSquareByTerritoryId} from '../game-logic/store/map/square/square.selectors';
import {selectTerritories} from '../game-logic/store/territory/territory.selectors';
import {selectUnits} from '../game-logic/store/unit/unit.selectors';

@Injectable()
export class GameBuilderService {
    @Inject(SceneManager) private sceneManager: SceneManager;
    @Inject(ModelManager) private modelManagerService: ModelManager;
    @Inject(TerritoryFactoryService) private territoryFactoryService: TerritoryFactoryService;
    @Inject(UnitFactoryService) private unitFactoryService: UnitFactoryService;
    @Inject(SCENE('space')) private spaceScene: BABYLON.Scene;
    @Inject(CAMERA('space')) private spaceCamera: FromAboveCamera;
    
    public build(): void {
        this.modelManagerService.addSimpleModel(new MapModel(this.spaceScene));

        selectTerritories()
            .filter((el: TerritoryState) => !selectSquareByTerritoryId(el.id).fogOfWar)
            .forEach((territoryState: TerritoryState) => this.territoryFactoryService.create(this.spaceScene, territoryState));

        selectUnits().forEach((unitState: UnitState) => this.unitFactoryService.create(this.spaceScene, unitState));

        this.setCameraTargetToFirstTerritory();
    }

    private setCameraTargetToFirstTerritory(): void {
        const playerSquare = selectPlayerSquares(selectPlayerId())[0];
        this.spaceCamera.setTarget(new BABYLON.Vector3(playerSquare.x, this.spaceCamera.target.y, playerSquare.y));
    }
}
