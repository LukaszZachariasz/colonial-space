import * as BABYLON from 'babylonjs';
import {GalaxyArea} from './galaxy-area';
import {Planet} from '../planet/planet';
import {SceneRoute} from '../../engine/scene-manager/scene-route';

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

    public withSceneRoute(sceneRoute: SceneRoute): GalaxyAreaBuilder {
        this.galaxyArea.route = sceneRoute;
        return this;
    }


    public build(): GalaxyArea {
        return this.galaxyArea;
    }
}
