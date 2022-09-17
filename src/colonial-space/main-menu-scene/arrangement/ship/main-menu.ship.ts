import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Routes} from '../../../core/routing/routing.enum';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuShip implements OnInit {
    @Inject(ModelManager) private modelManagerService: ModelManager;
    @Inject(SCENE) private scene: BABYLON.Scene;
    @Inject(CAMERA) private camera: BABYLON.ArcRotateCamera;

    public gameOnInit(): void {
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            this.scene,
            (meshes: AbstractMesh[]) => this.camera.lockedTarget = meshes[0]);
    }
}
