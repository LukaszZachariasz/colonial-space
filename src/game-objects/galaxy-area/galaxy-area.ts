import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {Planet} from '../planet/planet';
import earcut from 'earcut';

export class GalaxyArea implements GameObject {
    public path: BABYLON.Path2;
    public polygon: BABYLON.Mesh;
    public planet: Planet;

    public create(scene: BABYLON.Scene): void {
        const builder = new BABYLON.PolygonMeshBuilder('galaxyArea', this.path, scene, earcut);
        this.polygon = builder.build(false);
        this.polygon.visibility = 0.1;

        if (this.planet) {
            this.planet.create(scene);
        }
    }
}