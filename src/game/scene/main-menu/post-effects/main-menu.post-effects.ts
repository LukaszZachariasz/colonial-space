import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';

export class MainMenuPostEffects {
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    @Inject(CAMERA('main-menu')) private camera: BABYLON.ArcRotateCamera;
    
    constructor() {
        const pipeline = new BABYLON.DefaultRenderingPipeline(
            'PostEffects',
            false,
            this.scene,
            [this.camera]
        );

        pipeline.fxaaEnabled = true;
        pipeline.samples = 8;
        pipeline.chromaticAberrationEnabled = true;
        pipeline.chromaticAberration.aberrationAmount = 800;
        pipeline.chromaticAberration.radialIntensity = 4;

        pipeline.chromaticAberration.direction.x = Math.sin(Math.PI);
        pipeline.chromaticAberration.direction.y = Math.cos(Math.PI);
    }
}
