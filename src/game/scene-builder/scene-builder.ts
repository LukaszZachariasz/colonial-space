import * as BABYLON from 'babylonjs';
import {HexModel} from '../scene/space/model/hex/hex.model';
import {HexState} from '../store/map/hex/hex.state';
import {HexTerritoryFactory} from '../scene/space/model/hex/hex-territory/hex-territory.factory';
import {SpaceSceneBuilder} from '../scene/space/space.scene-builder';
import {SpaceSkybox} from '../scene/space/skybox/space/space.skybox';
import {UnitFactory} from '../scene/space/model/hex/unit/unit.factory';
import {sceneManager} from 'engine';
import {selectCurrentPlayerId} from '../store/player/player.selectors';
import {selectPlayerHexes} from '../store/map/hex/hex.selectors';
import {store} from '../game';

export class SceneBuilder {
    public spaceSceneBuilder: SpaceSceneBuilder = new SpaceSceneBuilder();
    public hexTerritoryFactory: HexTerritoryFactory = new HexTerritoryFactory();
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
                hex.playerId = hexState.playerId;

                if (hexState.territory) {
                    hex.setTerritory(
                        this.hexTerritoryFactory.create(
                            hexState.territory.type
                        )
                    );
                }

                if (hexState.unit) {
                    hex.setUnit(
                        this.unitFactory.create(
                            hexState.unit.unitType
                        )
                    );
                }

                this.spaceSceneBuilder.addHex(hex);
            });
        });

        this.setCameraTargetToFirstTerritory();
        sceneManager().addScene(this.spaceSceneBuilder.build());
    }

    private setCameraTargetToFirstTerritory(): void {
        const playerHex = selectPlayerHexes(selectCurrentPlayerId())[0];
        this.spaceSceneBuilder.spaceScene.camera.setTarget(new BABYLON.Vector3(playerHex.x, this.spaceSceneBuilder.spaceScene.camera.target.y, playerHex.y));
    }
}
