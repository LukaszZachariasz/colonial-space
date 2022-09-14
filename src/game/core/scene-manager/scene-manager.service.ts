import * as BABYLON from 'babylonjs';
import {ENGINE} from '@colonial-space/core/injector/tokens/engine/engine.token';
import {GuiManagerService} from '../gui-manager/gui-manager.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {Scene} from './scene';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnInit} from '@colonial-space/core/lifecycle/on-init/is-on-init';
import {isOnReady} from '@colonial-space/core/lifecycle/on-ready/is-on-ready';

@Injectable()
export class SceneManagerService implements OnInit {
    public scene: Scene;
    public allScenes: Scene[] = [];
    public preloadingScenes: Set<Scene> = new Set();

    public get currentScene(): Scene {
        return this.scene;
    }

    public get currentBabylonScene(): BABYLON.Scene {
        return this.scene.scene;
    }

    public get currentCamera(): BABYLON.Camera {
        return this.scene.camera;
    }

    @Inject(ENGINE) private engine: BABYLON.Engine;

    public gameOnInit(): void {
        this.engine.runRenderLoop(() => {
            this.scene?.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

    }

    public register<T extends Scene>(gameScene: T): T {
        isOnInit(gameScene) && gameScene.gameOnInit();
        this.allScenes.push(gameScene);
        return gameScene;
    }

    public setScene(gameScene: Scene): void {
        if (this.scene) {
            isOnDestroy(this.scene) && this.scene.gameOnDestroy();
            Injector.inject(GuiManagerService).disposeGuiScene();
            this.scene.scene.detachControl();
        }
        this.scene = gameScene;
        isOnReady(this.scene) && this.scene.gameOnReady();
        Injector.inject(GuiManagerService).createGuiScene();

        this.scene.scene.attachControl();
    }

    public navigateToScene(name: string): void {
        this.setScene(this.getScene(name));
    }

    public getScene(name: string): Scene {
        const scene = this.allScenes.find((el: Scene) => el.name === name);

        if (!scene) {
            throw new Error('RegisteredScene not found, are you sure scene is registered?');
        }

        return scene;
    }
}
