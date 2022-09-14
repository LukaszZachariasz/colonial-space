import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {ModelManagerService} from '../../core/model-manager/model-manager.service';
import {OnDestroy} from '@colonial-space/core/lifecycle/on-destroy/on-destroy';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';
import {SpaceSkyboxConst} from '../game/scene/space/model/skybox/space/space-skybox.const';

export class MainMenuScene implements OnInit, OnDestroy {
    public gui: MainMenuSceneGui = new MainMenuSceneGui();

    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    @Inject(CAMERA('main-menu')) private camera: BABYLON.Camera;

    public gameOnInit(): void {
        this.camera.fov = 1.3;
        Injector.inject(ModelManagerService).addSimpleModel(new SpaceSkybox(this.scene, SpaceSkyboxConst[3]));
        this.initSceneContent();
        this.initMainMenuScenePostEffects();
        new BABYLON.Sound('Music', 'resources/sound/main-menu/main-menu.mp3', this.scene, null, {
            loop: true,
            autoplay: false
        });
    }

    private initMainMenuScenePostEffects(): void {
        const pipeline = new BABYLON.DefaultRenderingPipeline(
            'menuRenderPipeline',
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

    private initSceneContent(): void {
        this.scene.clearColor = BABYLON.Color4.FromInts(0, 0, 0, 255);
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            this.scene,
            (meshes: AbstractMesh[]) => this.camera.lockedTarget = meshes[0]);
    }

    public gameOnDestroy(): void {
        this.music.stop();
    }
}
