import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injector} from '@colonial-space/core/injector/injector';
import {MainMenuMusic} from './music/main-menu.music';
import {MainMenuPostEffects} from './post-effects/main-menu.post-effects';
import {ModelManagerService} from '../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {OnLoad} from '@colonial-space/core/lifecycle/on-load/on-load';
import {OnUnload} from '@colonial-space/core/lifecycle/on-unload/on-unload';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';
import {SpaceSkyboxConst} from '../game/scene/space/model/skybox/space/space-skybox.const';

export class MainMenuScene implements OnInit, OnLoad, OnUnload {
    @Inject(ModelManagerService) private modelManagerService: ModelManagerService;
    @Inject(SCENE('main-menu')) private scene: BABYLON.Scene;
    @Inject(CAMERA('main-menu')) private camera: BABYLON.ArcRotateCamera;

    private music: MainMenuMusic;
    private postEffects: MainMenuPostEffects;

    public gameOnInit(): void {
        this.scene.clearColor = BABYLON.Color4.FromInts(0, 0, 0, 255);
        this.camera.fov = 1.3;
        this.postEffects = new MainMenuPostEffects();
        this.music = new MainMenuMusic();

        this.initSceneContent();
    }
    
    public gameOnLoad(): void {
        this.music.play();
    }
    
    public gameOnUnload(): void {
        this.music.stop();
    }

    private initSceneContent(): void {
        Injector.inject(ModelManagerService).addSimpleModel(new SpaceSkybox(this.scene, SpaceSkyboxConst[3]));

        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            this.scene,
            (meshes: AbstractMesh[]) => this.camera.lockedTarget = meshes[0]);
    }
}
