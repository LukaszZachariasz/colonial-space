import * as BABYLON from 'babylonjs';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {Scene} from '../../../game/scene/scene';
import {gameEngine} from '../../../core/game-platform';


export class MainMenuScene extends Scene<BABYLON.ArcRotateCamera, MainMenuSceneGui> {
    public static readonly SCENE_NAME = 'main-menu-scene';

    public name: string = MainMenuScene.SCENE_NAME;

    constructor() {
        super(false);
        this.initMainMenuSceneGui();
        this.initSceneContent();
        this.initMainMenuCamera();
        this.initMainMenuScenePostEffects();
    }

    private handleMesh(mesh: BABYLON.AbstractMesh[]): void {
    }

    private initMainMenuScenePostEffects(): void {
        const pipeline = new BABYLON.DefaultRenderingPipeline(
            'menuRenderPipeline', // The name of the pipeline
            true, // Do you want the pipeline to use HDR texture?
            this.scene, // The scene instance
            [this.camera] // The list of cameras to be attached to
        );

        pipeline.fxaaEnabled = true;
        pipeline.sharpenEnabled = true;
        pipeline.sharpen.edgeAmount = 2;

        // pipeline.bloomEnabled = true;
        // pipeline.bloomThreshold = 0.8;
        // pipeline.bloomWeight = 1;
        // pipeline.bloomKernel = 111;
        // pipeline.bloomScale = 0.5;

        pipeline.samples = 16;

        pipeline.chromaticAberrationEnabled = true;
        pipeline.chromaticAberration.aberrationAmount = 300;
        pipeline.chromaticAberration.radialIntensity = 3;

        const rotation = Math.PI;
        pipeline.chromaticAberration.direction.x = Math.sin(rotation);
        pipeline.chromaticAberration.direction.y = Math.cos(rotation);
        // pipeline.grain.animated = value;

        //pipeline.grainEnabled = true;
    }

    private initMainMenuCamera(): void {
        this.camera = new BABYLON.ArcRotateCamera('MainMenuCamera', 1.186, 1.204, 7.768, new BABYLON.Vector3(2.304, 0.859, -2.334), this.scene);
        this.camera.attachControl(gameEngine().canvas, true);
        this.camera.fov = 0.9;
    }

    private initSceneContent(): void {
        this.scene.clearColor = new BABYLON.Color4(0, 0, 0, 1);

        BABYLON.SceneLoader.ImportMesh('',
            'resources/blender_src/rocket_plane_01/', 'rocket_plane_1.glb',
            this.scene, (mesh: BABYLON.AbstractMesh[]) => this.handleMesh(mesh));

    }

    private initMainMenuSceneGui(): void {
        this.gui = new MainMenuSceneGui();
    }
}
