import * as BABYLON from 'babylonjs';
import {GalaxyArea} from './galaxy-area';
import {Planet} from '../planet/planet';

export class GalaxyAreaBuilder {
    public galaxyArea: GalaxyArea = new GalaxyArea();

    public startPath(x: number, y: number): GalaxyAreaBuilder {
        this.galaxyArea.path = new BABYLON.Path2(x, y);
        return this;
    }

    public pathArcTo(midX: number, midY: number, endX: number, endY: number): GalaxyAreaBuilder {
        this.galaxyArea.path.addArcTo(midX, midY, endX, endY);
        return this;
    }

    public withPlanet(planet: Planet): GalaxyAreaBuilder {
        this.galaxyArea.planet = planet;
        return this;
    }

    public build(): GalaxyArea {
        return this.galaxyArea;
    }
}