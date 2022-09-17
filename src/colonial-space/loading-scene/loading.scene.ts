import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class LoadingScene {
    @Inject(SCENE) private scene: BABYLON.Scene;
    @Inject(CAMERA) private camera: BABYLON.Camera;

    public gameOnInit(): void {
        this.scene.registerBeforeRender(() => {
            this.camera.fov -= 0.0001;
        });
    }
}
