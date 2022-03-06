import {GalaxyScene} from '../../game-scenes/galaxy-scene/galaxy-scene';
import {GalaxySceneBuilder} from '../../game-scenes/galaxy-scene/galaxy-scene-builder';
import {GameScene} from '../../game-scenes/game-scene';
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
            .build();
    }

    public createPlanetScene(): PlanetScene {
        return new PlanetSceneBuilder()
            .withArcCamera()
            .withSkyBox()
            .withPlanet()
            .withLights()
            .build();
    }
}