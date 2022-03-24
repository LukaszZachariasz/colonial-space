import * as BABYLON from 'babylonjs';
import {SpaceSceneBuilder} from '../scene/space/space.scene-builder';
import {SpaceSkybox} from '../scene/space/skybox/space/space.skybox';
import {SquareModel} from '../scene/space/model/square/square.model';
import {SquareState} from '../store/map/square/square.state';
import {TerritoryFactory} from '../scene/space/model/territory/territory.factory';
import {TerritoryModel} from '../scene/space/model/territory/territory.model';
import {TerritoryState} from '../store/territory/territory.state';
import {UnitFactory} from '../scene/space/model/unit/unit.factory';
import {UnitModel} from '../scene/space/model/unit/unit.model';
import {UnitState} from '../store/unit/unit.state';
import {sceneManager} from 'engine';
import {selectCurrentPlayerId} from '../store/player/player.selectors';
import {selectPlayerSquares} from '../store/map/square/square.selectors';
import {store} from '../game';

export class SceneBuilder {
    public spaceSceneBuilder: SpaceSceneBuilder = new SpaceSceneBuilder();
    public territoryFactory: TerritoryFactory = new TerritoryFactory();
    public unitFactory: UnitFactory = new UnitFactory();

    public build(): void {
        this.spaceSceneBuilder
            .camera()
            .skybox(new SpaceSkybox(store().map.skyboxType))
            .galaxyDust()
            .gui();

        store().map.squares.forEach((squareStates: SquareState[]) => {
            squareStates.forEach((squareState: SquareState) => {
                const square = new SquareModel(new BABYLON.Vector2(squareState.x, squareState.y));
                square.state = squareState;
                this.spaceSceneBuilder.addSquare(square);
            });
        });

        store().territories.forEach((territoryState: TerritoryState) => {
            const territory: TerritoryModel = this.territoryFactory.create(territoryState.type);
            territory.state = territoryState;
            this.spaceSceneBuilder.addTerritory(territory);
        });
        
        store().units.forEach((unitState: UnitState) => {
            const unit: UnitModel = this.unitFactory.create(unitState.type);
            unit.state = unitState;
            this.spaceSceneBuilder.addUnit(unit);
        });

        this.setCameraTargetToFirstTerritory();
        sceneManager().addScene(this.spaceSceneBuilder.build());
    }

    private setCameraTargetToFirstTerritory(): void {
        const playerSquare = selectPlayerSquares(selectCurrentPlayerId())[0];
        this.spaceSceneBuilder.spaceScene.camera.setTarget(new BABYLON.Vector3(playerSquare.x, this.spaceSceneBuilder.spaceScene.camera.target.y, playerSquare.y));
    }
}
