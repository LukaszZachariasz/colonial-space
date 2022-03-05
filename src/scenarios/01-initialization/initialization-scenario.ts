import {Scenario} from "../scenario";
import {PlanetScene} from "../../game-scenes/planet-scene/planet-scene";
import {PlanetSceneBuilder} from "../../game-scenes/planet-scene/planet-scene-builder";
import {GalaxyScene} from "../../game-scenes/galaxy-scene/galaxy-scene";
import {GalaxySceneBuilder} from "../../game-scenes/galaxy-scene/galaxy-scene-builder";

export class InitializationScenario implements Scenario {
    galaxyScene: GalaxyScene;
    planetScene: PlanetScene;

    createScenario() {
        this.galaxyScene = this.createGalaxyScene();
        this.planetScene = this.createPlanetScene();
    }

    createGalaxyScene(): GalaxyScene {
        return new GalaxySceneBuilder()
            .withLockedCamera()
            .withSkybox()
            .build();
    }

    createPlanetScene(): PlanetScene {
        return new PlanetSceneBuilder()
            .withArcCamera()
            .withSkyBox()
            .withPlanet()
            .withLights()
            .build();
    }
}