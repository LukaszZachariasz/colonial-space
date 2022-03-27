import * as BABYLON from 'babylonjs';
import {SpaceSceneBuilder} from '../scene/space/space.scene-builder';
import {SpaceSkybox} from '../scene/space/skybox/space/space.skybox';
import {SquareModel} from '../scene/space/model/square/square.model';
import {SquareState} from '../logic/store/map/square/square.state';
import {TerritoryFactory} from '../scene/space/model/territory/territory.factory';
import {TerritoryModel} from '../scene/space/model/territory/territory.model';
import {TerritoryState} from '../logic/store/territory/territory.state';
import {UnitFactory} from '../scene/space/model/unit/unit.factory';
import {UnitModel} from '../scene/space/model/unit/unit.model';
import {UnitState} from '../logic/store/unit/unit.state';
import {sceneManager} from 'engine';
import {selectMapSkybox} from '../logic/store/map/tour.selectors';
import {selectPlayerId} from '../logic/store/player/player.selectors';
import {selectPlayerSquares, selectSquares} from '../logic/store/map/square/square.selectors';
import {selectTerritories} from '../logic/store/territory/territory.selectors';
import {selectUnits} from '../logic/store/unit/unit.selectors';

export class GameBuilder {
    public spaceSceneBuilder: SpaceSceneBuilder = new SpaceSceneBuilder();
    public territoryFactory: TerritoryFactory = new TerritoryFactory();
    public unitFactory: UnitFactory = new UnitFactory();

    public build(): void {
        this.spaceSceneBuilder
            .camera()
            .skybox(new SpaceSkybox(selectMapSkybox()))
            .galaxyDust()
            .gui();

        selectSquares().forEach((squareStates: SquareState[]) => {
            squareStates.forEach((squareState: SquareState) => {
                const square = new SquareModel(new BABYLON.Vector2(squareState.x, squareState.y));
                square.state = squareState;
                this.spaceSceneBuilder.addSquare(square);
            });
        });

        selectTerritories().forEach((territoryState: TerritoryState) => {
            const territory: TerritoryModel = this.territoryFactory.create(territoryState);
            this.spaceSceneBuilder.addTerritory(territory);
        });
        
        selectUnits().forEach((unitState: UnitState) => {
            const unit: UnitModel = this.unitFactory.create(unitState.type, unitState);
            this.spaceSceneBuilder.addUnit(unit);
        });

        this.setCameraTargetToFirstTerritory();
        sceneManager().register(this.spaceSceneBuilder.build());
    }

    private setCameraTargetToFirstTerritory(): void {
        const playerSquare = selectPlayerSquares(selectPlayerId())[0];
        this.spaceSceneBuilder.spaceScene.camera.setTarget(new BABYLON.Vector3(playerSquare.x, this.spaceSceneBuilder.spaceScene.camera.target.y, playerSquare.y));
    }
}
