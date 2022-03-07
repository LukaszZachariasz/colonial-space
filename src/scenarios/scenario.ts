import * as BABYLON from 'babylonjs';
import {GalaxyScene} from '../game-scenes/galaxy-scene/galaxy-scene';
import {PlanetScene} from '../game-scenes/planet-scene/planet-scene';

export interface Scenario {
    galaxyScene: GalaxyScene;
    planetScene: PlanetScene;

    get initialScene(): BABYLON.Scene;

    createScenario(): void;

    createGalaxyScene(): GalaxyScene;

    createPlanetScene(): PlanetScene;
}