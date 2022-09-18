import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {MainMenuShipModel} from './model/ship/main-menu-ship.model';
import {ModelManager} from '@colonial-space/core/scene-manager/model/model-manager';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuScene implements OnInit {
    @Inject(SCENE) private scene: BABYLON.Scene;
    @Inject(CAMERA) private camera: BABYLON.ArcRotateCamera;
    @Inject(ModelManager) private modelManager: ModelManager;

    public gameOnInit(): void {
        this.scene.clearColor = BABYLON.Color4.FromInts(0, 0, 0, 255);
        this.camera.fov = 1.3;
        this.modelManager.addImportModel(MainMenuShipModel, this.scene);
    }
}
