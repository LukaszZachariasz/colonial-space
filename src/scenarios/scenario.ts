import {GalaxyScene} from '../game-scenes/galaxy-scene/galaxy-scene';
import {GameScene} from '../game-scenes/game-scene';
import {PlanetScene} from '../game-scenes/planet-scene/planet-scene';

export interface Scenario {
    galaxyScene: GalaxyScene;
    planetScene: PlanetScene;

    get initialScene(): GameScene;

    createScenario(): void;

    createGalaxyScene(): GalaxyScene;

    createPlanetScene(): PlanetScene;
}