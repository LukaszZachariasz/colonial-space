import * as BABYLON from 'babylonjs';
import {Scene} from '../../game/scene/scene';
import {guiManager} from 'engine';

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
            this.scene.scene.detachControl();
        }
        this.scene = {...gameScene};
        guiManager().reset();

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
