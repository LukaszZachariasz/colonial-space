import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {Skybox} from '../skybox';
import {Vector3} from 'babylonjs';

export class SpaceSkybox implements Skybox {
    public skybox: BABYLON.Mesh;
    public material: BABYLON.StandardMaterial;

    public create(scene: BABYLON.Scene): void {
        this.skybox = BABYLON.MeshBuilder.CreateBox('spaceSkyBox', {size: 1000.0}, scene);
        this.material = new BABYLON.StandardMaterial('spaceSkyBox', scene);
        this.material.backFaceCulling = false;
        this.material.reflectionTexture = new BABYLON.CubeTexture('resources/skybox/space-skybox-01/', scene);
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.material.alphaCutOff = 0.5;
        this.skybox.material = this.material;

        BABYLON.SceneLoader.ImportMesh('', 'resources/galaxies/', 'galaxy.glb', scene, () => {
            const galaxies: AbstractMesh[] = scene.meshes.filter((el: AbstractMesh) => el.name.includes('galaxy'));

            galaxies.forEach((galaxy: AbstractMesh, index: number) => {
                galaxy.position = new Vector3(300 + (index * 100), index * 100, 300 + (index * 100));
                galaxy.rotation = new Vector3(100, 20, 50);
                galaxy.scaling = new Vector3(100, 100, 100);
            });
        });
    }
}
