import * as BABYLON from 'babylonjs';

export class GalaxyOrigin {
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);

    private sphere: BABYLON.Mesh;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.Mesh.CreateSphere('galaxyOrigin', 16, 10, scene);
        this.sphere.position = this.position;
    }
}