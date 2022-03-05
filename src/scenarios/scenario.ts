import {PlanetScene} from "../game-scenes/planet-scene/planet-scene";

export interface Scenario {
    planetScene: PlanetScene;

    createScenario(): void;

    createPlanetScene(): PlanetScene;
}