import * as BABYLON from 'babylonjs';
import {ActionManager} from 'babylonjs/Actions/actionManager';
import {Inject} from '../../../../../core/injector/inject';
import {Model} from '../../model/model';
import {SelectionService} from '../../../../logic/selection/selection.service';
import {SpaceSkyboxConst} from './space-skybox.const';

export class SpaceSkybox implements Model {
    public skybox: BABYLON.Mesh;
    public material: BABYLON.StandardMaterial;

    @Inject(SelectionService) private selectionService: SelectionService;
    private actionManager: ActionManager;

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

        scene.registerAfterRender(() => {
            this.skybox.rotation.x += 0.00005;
            this.skybox.rotation.z += 0.00005;
        });

        this.actionManager = new BABYLON.ActionManager(scene);
        this.skybox.actionManager = this.actionManager;
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.selectionService.deselect();
            })
        );
    }
}
