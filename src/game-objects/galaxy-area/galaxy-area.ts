import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import earcut from 'earcut';

export class GalaxyArea implements GameObject {
    public path: BABYLON.Path2 = new BABYLON.Path2(-20, -20);
    public polygon: BABYLON.Mesh;
    public material: BABYLON.StandardMaterial;

    public create(scene: BABYLON.Scene): void {
        this.path.addArcTo(-15.5, -19.5, -11.5, -21);
        this.path.addArcTo(-6.5, -16, -8, -14);
        this.path.addArcTo(-5, -1, -9, -5);
        this.path.addArcTo(-9, -3, -11, 0);
        this.path.addArcTo(-17, -3, -18, -5);
        this.path.addArcTo(-17, -6, -16, -8);
        this.path.addArcTo(-16, -10, -20, -15);
        this.path.addArcTo(-22, -18, -20, -20);

        const builder = new BABYLON.PolygonMeshBuilder('galaxyArea', this.path, scene, earcut);
        this.polygon = builder.build(false, 1);
    }
}