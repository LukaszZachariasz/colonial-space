import * as BABYLON from 'babylonjs';
import {HexModel} from '../scene/space/model/hex/hex.model';
import {HexState} from '../store/map/hex/hex.state';
import {SpaceSceneBuilder} from '../scene/space/space.scene-builder';
import {SpaceSkybox} from '../scene/space/skybox/space/space.skybox';
import {TerritoryFactory} from '../scene/space/model/territory/territory.factory';
import {TerritoryModel} from '../scene/space/model/territory/territory.model';
import {TerritoryState} from '../store/territory/territory.state';
import {UnitFactory} from '../scene/space/model/unit/unit.factory';
import {UnitModel} from '../scene/space/model/unit/unit.model';
import {UnitState} from '../store/unit/unit.state';
import {sceneManager} from 'engine';
import {selectCurrentPlayerId} from '../store/player/player.selectors';
import {selectHexById, selectPlayerHexes} from '../store/map/hex/hex.selectors';
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

        store().map.hexes.forEach((hexStates: HexState[]) => {
            hexStates.forEach((hexState: HexState) => {
                const hex = new HexModel(new BABYLON.Vector2(hexState.x, hexState.y));
                hex.state = hexState;
                this.spaceSceneBuilder.addHex(hex);
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
        const playerHex = selectPlayerHexes(selectCurrentPlayerId())[0];
        this.spaceSceneBuilder.spaceScene.camera.setTarget(new BABYLON.Vector3(playerHex.x, this.spaceSceneBuilder.spaceScene.camera.target.y, playerHex.y));
    }
}
