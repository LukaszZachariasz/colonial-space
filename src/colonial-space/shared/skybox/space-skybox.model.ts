import * as BABYLON from 'babylonjs';
import {ActionManager} from 'babylonjs/Actions/actionManager';
import {Inject} from '@colonial-space/core/injector/inject';
import {Model} from '@colonial-space/core/scene-manager/model/model-elements/model';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SelectionService} from '../../game/game-logic/selection/selection.service';
import {SpaceSkyboxConst} from './space-skybox.const';

export class SpaceSkyboxModel extends Model<BABYLON.Mesh> implements OnInit {
    @Inject(SelectionService) private selectionService: SelectionService;
    @Inject(SCENE) private scene: BABYLON.Scene;

    public material: BABYLON.StandardMaterial;

    private actionManager: ActionManager;

    constructor(private type: string = SpaceSkyboxConst[0]) {
        super();
    }

    public gameOnInit(): void {
        this.mesh = BABYLON.MeshBuilder.CreateBox('SpaceSkyBox', {size: 1000.0}, this.scene);
        this.mesh.infiniteDistance = true;

        this.material = new BABYLON.StandardMaterial('SpaceSkyBoxMaterial', this.scene);
        this.material.backFaceCulling = false;
        this.material.reflectionTexture = new BABYLON.CubeTexture(`resources/skybox/space/${this.type}/`, this.scene);
        this.material.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
        this.material.reflectionTexture.level = 1.5;
        this.material.diffuseColor = new BABYLON.Color3(0, 0, 0);
        this.material.specularColor = new BABYLON.Color3(0, 0, 0);
        this.material.alphaCutOff = 0.5;

        this.mesh.material = this.material;

        this.scene.registerAfterRender(() => {
            this.mesh.rotation.x += 0.00001;
            this.mesh.rotation.z += 0.00001;
        });

        this.actionManager = new BABYLON.ActionManager(this.scene);
        this.mesh.actionManager = this.actionManager;
        this.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPickDownTrigger, () => {
                this.selectionService.deselectAll();
            })
        );
    }
}