import * as BABYLON from 'babylonjs';
import {modelManager} from 'engine';
import {AfterCreated} from '../engine/lifecycle/after-created/after-created';
import {OnDestroy} from '../engine/lifecycle/on-destroy/on-destroy';
import {GameScene} from '../engine/scene-manager/game-scene';
import {Scene} from '../engine/scene-manager/scene';
import {SpaceSkyboxConst} from '../game/scene/space/model/skybox/space/space-skybox.const';
import {SpaceSkybox} from '../game/scene/space/model/skybox/space/space.skybox';
import {ScoutShipModel} from '../game/scene/space/model/unit/scout-ship/scout-ship.model';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import Color4 = BABYLON.Color4;
import Vector3 = BABYLON.Vector3;


@GameScene({
    name: 'MainMenuScene',
    preload: true
})
export class MainMenuScene extends Scene<BABYLON.ArcRotateCamera, MainMenuSceneGui> implements AfterCreated, OnDestroy {
    public camera: BABYLON.ArcRotateCamera = new BABYLON.ArcRotateCamera('MainMenuCamera', 5.4, 1.1, 2, Vector3.Zero(), this.scene);
    public gui: MainMenuSceneGui = new MainMenuSceneGui();
    public music = new BABYLON.Sound('Music', 'resources/sound/main-menu/main-menu.mp3', this.scene, null, {
        loop: true,
        autoplay: true
    });

    public gameAfterCreated(): void {
        this.camera.fov = 1.2;
        modelManager().addSimpleModel(new SpaceSkybox(this.scene, SpaceSkyboxConst[0]));
        this.initSceneContent();
        this.initMainMenuScenePostEffects();
    }


    private initMainMenuScenePostEffects(): void {
        new BABYLON.ScreenSpaceCurvaturePostProcess('asd', this.scene, {
            width: 3000, height: 3000
        }, this.camera);

        const pipeline = new BABYLON.DefaultRenderingPipeline(
            'menuRenderPipeline',
            false,
            this.scene,
            [this.camera]
        );

        pipeline.samples = 4;
        pipeline.fxaaEnabled = true;

    }

    private initSceneContent(): void {
        this.scene.clearColor = Color4.FromInts(0, 0, 0, 255);


        new ScoutShipModel(this.scene, null);
    }

    public gameOnDestroy(): void {
        this.music.stop();
    }
}
