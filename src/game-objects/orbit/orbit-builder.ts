import * as BABYLON from 'babylonjs';
import {Orbit} from './orbit';
import {Planet} from '../planet/planet';

export class OrbitBuilder {
    public orbit = new Orbit();

    public originPosition(position: BABYLON.Vector3): OrbitBuilder {
        this.orbit.originPosition = position;
        return this;
    }

    public radius(radius: number): OrbitBuilder {
        this.orbit.radius = radius;
        return this;
    }

    public withPlanet(planet: Planet, planetCurrentPosition: number): OrbitBuilder {
        this.orbit.planetCurrentPosition = planetCurrentPosition;
        this.orbit.planet = planet;
        return this;
    }

    public build(): Orbit {
        return this.orbit;
    }
}