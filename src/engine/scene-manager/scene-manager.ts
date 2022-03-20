import * as BABYLON from 'babylonjs';
import {guiManager} from 'engine';
import {Scene} from '../../game/scene/scene';

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

    public addScene(gameScene: Scene): void {
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
        return this.allScenes.find((el: Scene) => el.name === name);
    }
}
