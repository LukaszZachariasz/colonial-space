import {LoadSectorScene} from './load-sector-scene/load-sector-scene';
import {PlanetBuilder} from '../../../../game-objects/planet/planet-builder';
import {PlanetSceneBuilder} from '../../../../scenes/planet/planet-scene-builder';
import {PlanetState} from '../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {
    SectorState
} from '../../../game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/sector-state/sector-state';
import {sceneManager} from '../../../../core/game-platform';

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

        sceneManager().addScene(builder.build());
    }
}
