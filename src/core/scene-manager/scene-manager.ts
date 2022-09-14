import * as BABYLON from 'babylonjs';
import {CAMERA} from '@colonial-space/core/injector/tokens/camera/camera.token';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {GuiManager} from '@colonial-space/core/gui-manager/gui-manager';
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
        const componentsDefinitions = sceneOption.components?.map((component: any) => new component());

        const babylonScene = new BABYLON.Scene(Injector.inject(ENGINE));
        const camera = sceneOption.cameraFactory(babylonScene);

        Injector.set(SCENE(sceneOption.name), babylonScene);
        Injector.set(CAMERA(sceneOption.name), camera);

        isOnInit(sceneDefinition) && sceneDefinition.gameOnInit();
        isOnInit(guiDefinition) && guiDefinition.gameOnInit();
        componentsDefinitions?.forEach((component: any) => isOnInit(component) && component.gameOnInit());

        this.allScenes.push({
            name: sceneOption.name,
            scene: babylonScene,
            camera: camera,
            sceneDefinition: sceneDefinition,
            guiDefinition: guiDefinition,
            componentDefinitions: componentsDefinitions
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
            this.unloadScene();
        }

        this.currentSceneRoute = gameScene;
        this.loadScene();
    }

    private unloadScene(): void {
        isOnUnload(this.currentSceneRoute.sceneDefinition) && this.currentSceneRoute.sceneDefinition.gameOnUnload();
        this.currentSceneRoute.componentDefinitions?.forEach((component: any) => isOnUnload(component) && component.gameOnUnload());
        Injector.inject(GuiManager).disposeGuiScene();
        this.currentSceneRoute.scene.detachControl();
    }

    private loadScene(): void {
        isOnLoad(this.currentSceneRoute) && this.currentSceneRoute.gameOnLoad();
        this.currentSceneRoute.componentDefinitions?.forEach((component: any) => isOnLoad(component) && component.gameOnLoad());
        Injector.inject(GuiManager).createGuiScene();
        this.currentSceneRoute.scene.attachControl();
    }
}
