import {GameObject} from "../game-object";
import * as BABYLON from "babylonjs";

export class Planet implements GameObject {
    sphere: BABYLON.Mesh;
    material: BABYLON.StandardMaterial;

    create(scene: BABYLON.Scene) {
        this.sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        this.material = new BABYLON.StandardMaterial("ground", scene);
        this.material.diffuseTexture = new BABYLON.Texture("resources/planet/earth.jpg", scene);

        this.sphere.material = this.material;

        scene.registerBeforeRender(() => {
            this.sphere.rotate(new BABYLON.Vector3(0, -1, -1), 0.001)
        })
    }
}