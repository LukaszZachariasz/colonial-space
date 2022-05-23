import * as BABYLON from 'babylonjs';
import {ActionManager} from 'babylonjs/Actions/actionManager';
import {SpaceSkyboxConst} from './space-skybox.const';
import {logic} from '../../../../../game';

export class SpaceSkybox {
    public skybox: BABYLON.Mesh;
    public material: BABYLON.StandardMaterial;

    private actionManager: ActionManager;

    constructor(private scene: BABYLON.Scene,
                private type: string = SpaceSkyboxConst[0]) {
        this.skybox = BABYLON.MeshBuilder.CreateBox('SpaceSkyBox', {size: 1000.0}, this.scene);
        this.skybox.infiniteDistance = true;

        this.material = new BABYLON.StandardMaterial('SpaceSkyBoxMaterial', this.scene);
        this.material.backFaceCulling = false;
        this.material.reflectionTexture = new BABYLON.CubeTexture(`resources/skybox/space/${this.type}/`, this.scene);
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.material.alphaCutOff = 0.5;

        this.skybox.material = this.material;

        this.scene.registerAfterRender(() => {
            this.skybox.rotation.x += 0.00001;
            this.skybox.rotation.z += 0.00001;
        });

        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.skybox.actionManager = this.actionManager;
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                logic().selectedUnitService.deselect();
                logic().selectedTerritoryService.deselect();
            })
        );
    }
}
