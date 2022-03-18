import * as BABYLON from 'babylonjs';
import {Hex} from '../../game-objects/hex/hex';
import {HexState} from '../../game-state/map/hex/hex.state';
import {HexTerritoryFactory} from '../../game-objects/hex/hex-territory/hex-territory.factory';
import {SpaceSceneBuilder} from '../../scenes/space/space.scene-builder';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';
import {gameState, sceneManager} from '../../core/game-platform';

export class GameBuilder {
    public spaceSceneBuilder: SpaceSceneBuilder = new SpaceSceneBuilder();
    public hexTerritoryFactory: HexTerritoryFactory = new HexTerritoryFactory();

    public build(): void {
        this.spaceSceneBuilder
            .camera()
            .skybox(new SpaceSkybox())
            .galaxyDust()
            .gui();

        gameState().map.hexes.forEach((hexStates: HexState[]) => {
            hexStates.forEach((hexState: HexState) => {
                const hex = new Hex(new BABYLON.Vector2(hexState.x, hexState.y));

                if (hexState.territory) {
                    hex.setTerritory(
                        this.hexTerritoryFactory.create(
                            hexState.territory.type
                        )
                    );
                }

                this.spaceSceneBuilder.addHex(hex);
            });
        });

        sceneManager().addScene(this.spaceSceneBuilder.build());
    }
}