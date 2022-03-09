import * as BABYLON from 'babylonjs';
import {Planet} from './planet';

export class PlanetBuilder {
    public planet: Planet = new Planet();

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

    public build(): Planet {
        return this.planet;
    }
}