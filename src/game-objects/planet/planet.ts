import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';

export class Planet implements GameObject {
    public position: BABYLON.Vector3 = new BABYLON.Vector3(0, 0, 0);
    public size = 1;
    public diffuseTexture = '';

    private sphere: BABYLON.Mesh;
    private material: BABYLON.StandardMaterial;

    public create(scene: BABYLON.Scene): void {
        this.sphere = BABYLON.Mesh.CreateSphere('sphere1', 16, this.size, scene);
        this.sphere.position = this.position;
        this.material = new BABYLON.StandardMaterial('ground', scene);
        this.material.diffuseTexture = new BABYLON.Texture(this.diffuseTexture, scene);

        this.sphere.material = this.material;

        scene.registerBeforeRender(() => {
            this.sphere.rotate(new BABYLON.Vector3(0, -1, -1), 0.001);
        });
    }
}