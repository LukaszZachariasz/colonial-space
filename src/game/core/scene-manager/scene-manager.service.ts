import {ENGINE} from '@colonial-space/core/engine/engine';
import {Inject} from '@colonial-space/core/injector/inject';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import * as BABYLON from 'babylonjs';
import {GuiManagerService} from '../gui-manager/gui-manager.service';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {Injector} from '@colonial-space/core/injector/injector';
import {Scene} from './scene';
import {isAfterCreated} from '@colonial-space/core/lifecycle/after-created/is-after-created';
import {isOnDestroy} from '@colonial-space/core/lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '@colonial-space/core/lifecycle/on-ready/is-on-ready';

@Injectable()
export class SceneManagerService implements OnReady {
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

    public gameOnReady(): void {
        this.engine.runRenderLoop(() => {
            this.scene?.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });

    }

    public register<T extends Scene>(gameScene: T): T {
        isAfterCreated(gameScene) && gameScene.gameAfterCreated();
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
            throw new Error('Scene not found, are you sure scene is registered?');
        }

        return scene;
    }
}
