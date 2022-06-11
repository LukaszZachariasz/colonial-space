import * as BABYLON from 'babylonjs';
import {AbstractMesh} from 'babylonjs/Meshes/abstractMesh';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {Scene} from '../../../engine/scene-manager/scene';
import Vector3 = BABYLON.Vector3;
import Color4 = BABYLON.Color4;

export class MainMenuScene extends Scene<BABYLON.ArcRotateCamera, MainMenuSceneGui> {
    public static readonly SCENE_NAME = 'MainMenuScene';
    public name: string = MainMenuScene.SCENE_NAME;

    constructor() {
        super(false);
        this.initMainMenuSceneGui();
        this.initSceneContent();
        this.initMainMenuCamera();
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

    private initMainMenuCamera(): void {
        this.camera = new BABYLON.ArcRotateCamera(
            'MainMenuCamera',
            5.5,
            1,
            2,
            Vector3.Zero(),
            this.scene
        );

        this.camera.fov = 1.3;
    }

    private initSceneContent(): void {
        this.scene.clearColor = Color4.FromInts(0,0,0,255);
        BABYLON.SceneLoader.ImportMesh(
            '',
            'resources/unit/scout-ship/',
            'scout_ship_01.glb',
            this.scene,
            (meshes: AbstractMesh[]) => this.camera.lockedTarget = meshes[0]);
    }

    private initMainMenuSceneGui(): void {
        this.gui = new MainMenuSceneGui();
    }
}
