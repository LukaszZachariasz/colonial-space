import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {AfterCreated} from '../../core/lifecycle/after-created/after-created';
import {GameScene} from '../core/scene-manager/game-scene';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {ModelManagerService} from '../core/model-manager/model-manager.service';
import {OnDestroy} from '../../core/lifecycle/on-destroy/on-destroy';
import {Scene} from '../core/scene-manager/scene';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';
import {SpaceSkyboxConst} from '../game/scene/space/model/skybox/space/space-skybox.const';

@GameScene({
    name: 'MainMenuScene',
    preload: true
})
export class MainMenuScene extends Scene<BABYLON.ArcRotateCamera, MainMenuSceneGui> implements AfterCreated, OnDestroy {
    public camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera('MainMenuCamera', 5.5, 1, 2, BABYLON.Vector3.Zero(), this.scene);
    public gui: MainMenuSceneGui = new MainMenuSceneGui();
    public music = new BABYLON.Sound('Music', 'resources/sound/main-menu/main-menu.mp3', this.scene, null, {
            loop: true,
            autoplay: false
    });

    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    
    public gameAfterCreated(): void {
        this.camera.fov = 1.3;
        Injector.inject(ModelManagerService).addSimpleModel(new SpaceSkybox(this.scene, SpaceSkyboxConst[3]));
        this.initSceneContent();
        this.initMainMenuScenePostEffects();
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
