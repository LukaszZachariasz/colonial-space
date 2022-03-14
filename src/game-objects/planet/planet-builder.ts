import * as BABYLON from 'babylonjs';
import {Planet} from './planet';
import {
    PlanetState
} from '../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {SceneRoute} from '../../engine/scene-manager/scene-route';

export class PlanetBuilder {
    public planet: Planet = new Planet();

    public name(name: string): PlanetBuilder {
        this.planet.name = name;
        return this;
    }

    public size(size: number): PlanetBuilder {
        this.planet.size = size;
        return this;
    }

    public texture(resourceSrc: string): PlanetBuilder {
        this.planet.diffuseTexture = resourceSrc;
        return this;
    }

    public position(position: BABYLON.Vector3): PlanetBuilder {
        this.planet.position = position;
        return this;
    }

    public withState(planetState: PlanetState): PlanetBuilder {
        this.planet.state = planetState;
        return this;
    }

    public withSceneRoute(sceneRoute: SceneRoute): PlanetBuilder {
        this.planet.route = sceneRoute;
        return this;
    }

    public build(): Planet {
        return this.planet;
    }
}
