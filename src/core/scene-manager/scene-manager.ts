import {GuiManager} from '@colonial-space/core/gui-manager/gui-manager';
import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {Injector} from '@colonial-space/core/injector/injector';
import {RegisteredScene} from '@colonial-space/core/scene-manager/registered-scene';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneOption} from '@colonial-space/core/module/scene/scene-option';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';
import {isOnLoad} from '@colonial-space/core/lifecycle/on-load/is-on-load';
import {isOnUnload} from '@colonial-space/core/lifecycle/on-unload/in-on-unload';

export class SceneManager {
    public allScenes: RegisteredScene[] = [];
    public currentSceneRoute: RegisteredScene;
    
    public register(sceneOption: SceneOption): void {
        const sceneDefinition = new sceneOption.scene();
        const guiDefinition = new sceneOption.gui();

        const babylonScene = new BABYLON.Scene(Injector.inject(ENGINE));
        const camera = sceneOption.cameraFactory(babylonScene);

        Injector.set(SCENE(sceneOption.name), babylonScene);
        Injector.set(CAMERA(sceneOption.name), camera);

        isOnInit(sceneDefinition) && sceneDefinition.gameOnInit();
        isOnInit(guiDefinition) && guiDefinition.gameOnInit();

        this.allScenes.push({
            name: sceneOption.name,
            scene: babylonScene,
            gui: guiDefinition,
            camera: camera
        });

        if (sceneOption.root) {
            this.navigate(sceneOption.name);
        }
    }

    public navigate(name: string): void {
        this.setScene(this.allScenes.find((el: RegisteredScene) => el.name === name));
    }

    private setScene(gameScene: RegisteredScene): void {
        if (this.currentSceneRoute) {
            isOnUnload(this.currentSceneRoute) && this.currentSceneRoute.gameOnUnload();
            Injector.inject(GuiManager).disposeGuiScene();
            this.currentSceneRoute.scene.detachControl();
        }
        this.currentSceneRoute = gameScene;
        isOnLoad(this.currentSceneRoute) && this.currentSceneRoute.gameOnLoad();
        Injector.inject(GuiManager).createGuiScene();

        this.currentSceneRoute.scene.attachControl();
    }
}
