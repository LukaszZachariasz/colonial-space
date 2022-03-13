import {gamePlatform} from '../../../../core/game-platform';
import {LoadSectorScene} from './load-sector-scene/load-sector-scene';
import {PlanetBuilder} from '../../../../game-objects/planet/planet-builder';
import {PlanetSceneBuilder} from '../../../../game-scenes/planet-scene/planet-scene-builder';
import {PlanetState} from '../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {
    SectorState
} from '../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/sector-state/sector-state';
import gameState from '../../../game-state/game-state';

export class LoadPlanetScene {
    public loadSectorScene: LoadSectorScene = new LoadSectorScene();

    public loadPlanetScene(planetState: PlanetState): void {
        const builder: PlanetSceneBuilder = new PlanetSceneBuilder();

        builder.withArcCamera()
            .name(planetState.name)
            .withSkyBox()
            .withPlanet(
                new PlanetBuilder()
                    .name(planetState.name)
                    .size(planetState.size)
                    .texture(planetState.textureUrl)
                    .withState(planetState)
                    .build()
            )
            .withLights()
            .withGui();

        planetState.sectors.forEach((sector: SectorState) => {
            this.loadSectorScene.loadSectorScene(sector, planetState);
        });

        gamePlatform().engine.sceneManager.addScene(builder.build());
    }
}
