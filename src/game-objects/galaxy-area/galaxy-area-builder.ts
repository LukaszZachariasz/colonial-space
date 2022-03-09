import * as BABYLON from 'babylonjs';
import {GalaxyArea} from './galaxy-area';
import {GameScene} from '../../game-scenes/game-scene';
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

    public withPlanet(planet: Planet, planetScene: GameScene): GalaxyAreaBuilder {
        this.galaxyArea.planet = planet;
        this.galaxyArea.planetScene = planetScene;
        return this;
    }

    public build(): GalaxyArea {
        return this.galaxyArea;
    }
}