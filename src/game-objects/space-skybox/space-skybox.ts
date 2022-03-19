import * as BABYLON from 'babylonjs';
import {GameObject} from '../game-object';
import {SpaceSkyboxConst} from './space-skybox.const';

export class SpaceSkybox implements GameObject {
    public skybox: BABYLON.Mesh;
    public material: BABYLON.StandardMaterial;

    constructor(private type: string = SpaceSkyboxConst[0]) {
    }

    public create(scene: BABYLON.Scene): void {
        this.skybox = BABYLON.MeshBuilder.CreateBox('spaceSkyBox', {size: 1000.0}, scene);
        this.skybox.infiniteDistance = true;

        this.material = new BABYLON.StandardMaterial('spaceSkyBox', scene);
        this.material.backFaceCulling = false;
        this.material.reflectionTexture = new BABYLON.CubeTexture(`resources/skybox/space/${this.type}/`, scene);
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.material.alphaCutOff = 0.5;

        this.skybox.material = this.material;
    }
}
