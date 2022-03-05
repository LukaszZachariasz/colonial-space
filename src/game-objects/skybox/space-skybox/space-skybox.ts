import * as BABYLON from 'babylonjs';
import {Skybox} from "../skybox";

export class SpaceSkybox implements Skybox {
    skybox: BABYLON.Mesh;
    material: BABYLON.StandardMaterial;

    create(scene: BABYLON.Scene): void {
        this.skybox = BABYLON.MeshBuilder.CreateBox('spaceSkyBox', {size: 1000.0}, scene);
        this.material = new BABYLON.StandardMaterial('spaceSkyBox', scene);
        this.material.backFaceCulling = false;
        this.material.reflectionTexture = new BABYLON.CubeTexture("resources/skybox/space-skybox/", scene);
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.material.alphaCutOff = 0.5;
        this.skybox.material = this.material;

        scene.registerBeforeRender(() => {
            this.skybox.rotate(new BABYLON.Vector3(0, 0, 1), 0.0001);
        })
    }
}