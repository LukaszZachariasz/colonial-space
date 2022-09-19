import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/module/scene/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SCENE} from '@colonial-space/core/module/scene/scene.token';

export class MainMenuPostEffects implements OnLoad, OnUnload {
    @Inject(SCENE) private scene: BABYLON.Scene;
    @Inject(CAMERA) private camera: BABYLON.ArcRotateCamera;
    
    public pipeline: BABYLON.DefaultRenderingPipeline;

    public gameOnLoad(): void {
        this.pipeline = new BABYLON.DefaultRenderingPipeline(
            'PostEffects',
            false,
            this.scene,
            [this.camera]
        );

        this.pipeline.fxaaEnabled = true;
        this.pipeline.samples = 8;
        this.pipeline.chromaticAberrationEnabled = true;
        this.pipeline.chromaticAberration.aberrationAmount = 800;
        this.pipeline.chromaticAberration.radialIntensity = 4;

        this.pipeline.chromaticAberration.direction.x = Math.sin(Math.PI);
        this.pipeline.chromaticAberration.direction.y = Math.cos(Math.PI);
    }
    
    public gameOnUnload(): void {
        this.pipeline.dispose();
    }
}
