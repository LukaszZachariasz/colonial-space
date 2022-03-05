import {Scenario} from "../scenario";
import {PlanetScene} from "../../game-scenes/planet-scene/planet-scene";
import {PlanetSceneBuilder} from "../../game-scenes/planet-scene/planet-scene-builder";

export class InitializationScenario implements Scenario {
    planetScene: PlanetScene;

    createScenario() {
        this.planetScene = this.createPlanetScene();
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