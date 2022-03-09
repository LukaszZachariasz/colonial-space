import {AlphaGalaxy} from './alpha-galaxy/alpha-galaxy';
import {GalaxyScene} from '../../game-scenes/galaxy-scene/galaxy-scene';
import {GameScene} from '../../game-scenes/game-scene';
import {PlanetBuilder} from '../../game-objects/planet/planet-builder';
import {PlanetScene} from '../../game-scenes/planet-scene/planet-scene';
import {PlanetSceneBuilder} from '../../game-scenes/planet-scene/planet-scene-builder';
import {Scenario} from '../scenario';
import {SectorScene} from '../../game-scenes/sector-scene/sector-scene';
import {SectorSceneBuilder} from '../../game-scenes/sector-scene/sector-scene-builder';

export class InitializationScenario implements Scenario {
    public alphaGalaxy: GalaxyScene = new AlphaGalaxy().create();
    public planetScene: PlanetScene;
    public sectorOne: SectorScene;

    public get initialScene(): GameScene {
        return this.planetScene;
    }

    public createScenario(): void {
        this.planetScene = this.createPlanetScene();
        this.sectorOne = this.createSectorOne();
    }

    public createPlanetScene(): PlanetScene {
        return new PlanetSceneBuilder()
            .withArcCamera()
            .withSkyBox()
            .withPlanet(
                new PlanetBuilder()
                    .size(2.5)
                    .texture('resources/planet/earth.jpg')
                    .build()
            )
            .withLights()
            .withGui()
            .build();
    }

    public createSectorOne(): SectorScene {
        return new SectorSceneBuilder()
            .withArcCamera()
            .withGround()
            .withLights()
            .withGui()
            .build();
    }
}
