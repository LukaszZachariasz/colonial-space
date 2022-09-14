import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManagerService} from '../../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuShip implements OnInit {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    @Inject(CAMERA('main-menu')) private camera: BABYLON.ArcRotateCamera;

    public gameOnInit(): void {
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            this.scene,
            (meshes: AbstractMesh[]) => this.camera.lockedTarget = meshes[0]);
    }
}
