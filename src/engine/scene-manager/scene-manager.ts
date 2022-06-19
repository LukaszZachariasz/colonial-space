import * as BABYLON from 'babylonjs';
import {Scene} from './scene';
import {guiManager} from 'engine';
import {isAfterCreated} from '../lifecycle/after-created/is-after-created';
import {isOnDestroy} from '../lifecycle/on-destroy/is-on-destroy';
import {isOnReady} from '../lifecycle/on-ready/is-on-ready';

export class SceneManager {
    public scene: Scene;
    public allScenes: Scene[] = [];

    public get currentScene(): Scene {
        return this.scene;
    }

    public get currentBabylonScene(): BABYLON.Scene {
        return this.scene.scene;
    }

    public get currentCamera(): BABYLON.Camera {
        return this.scene.camera;
    }

    public register(gameScene: Scene): void {
        this.allScenes.push(gameScene);
    }

    public setScene(gameScene: Scene): void {
        if (this.scene) {
            isOnDestroy(this.scene) && this.scene.gameOnDestroy();
            guiManager().disposeGuiScene();
            this.scene.scene.detachControl();
        }
        this.scene = gameScene;
        isAfterCreated(this.scene) && this.scene.gameAfterCreated();
        isOnReady(this.scene) && this.scene.gameOnReady();
        guiManager().createGuiScene();

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
