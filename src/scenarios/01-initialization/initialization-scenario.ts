import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GalaxyScene} from '../../game-scenes/galaxy-scene/galaxy-scene';
import {GalaxySceneBuilder} from '../../game-scenes/galaxy-scene/galaxy-scene-builder';
import {GameScene} from '../../game-scenes/game-scene';
import {PlanetBuilder} from '../../game-objects/planet/planet-builder';
import {PlanetScene} from '../../game-scenes/planet-scene/planet-scene';
import {PlanetSceneBuilder} from '../../game-scenes/planet-scene/planet-scene-builder';
import {Scenario} from '../scenario';

export class InitializationScenario implements Scenario {
    public galaxyScene: GalaxyScene;
    public planetScene: PlanetScene;

    public get initialScene(): GameScene {
        return this.planetScene;
    }

    public createScenario(): void {
        this.galaxyScene = this.createGalaxyScene();
        this.planetScene = this.createPlanetScene();
    }

    public createGalaxyScene(): GalaxyScene {
        return new GalaxySceneBuilder()
            .withLockedCamera()
            .withSkybox()
            .withGalaxyArea(new GalaxyArea())
            .withLights()
            .build();
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
            .build();
    }
}