import {PlanetScene} from "../game-scenes/planet-scene/planet-scene";
import {GalaxyScene} from "../game-scenes/galaxy-scene/galaxy-scene";

export interface Scenario {
    galaxyScene: GalaxyScene;
    planetScene: PlanetScene;

    createScenario(): void;

    createGalaxyScene(): GalaxyScene;

    createPlanetScene(): PlanetScene;
}