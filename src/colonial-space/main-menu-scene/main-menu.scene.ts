import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuScene implements OnInit {
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    @Inject(CAMERA('main-menu')) private camera: BABYLON.ArcRotateCamera;

    public gameOnInit(): void {
        this.scene.clearColor = BABYLON.Color4.FromInts(0, 0, 0, 255);
        this.camera.fov = 1.3;
    }
}
