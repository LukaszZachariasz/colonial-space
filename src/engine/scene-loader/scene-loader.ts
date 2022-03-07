import * as BABYLON from 'babylonjs';

export class SceneLoader {
    public scenes: BABYLON.Scene[] = [];

    constructor() {}

    public addScene(scene: BABYLON.Scene): void {
        this.scenes.push(scene);
    }

    public removeScene(scene: BABYLON.Scene): void {
        this.scenes = this.scenes.filter((el: BABYLON.Scene) => el !== scene);
    }

    public overrideScenes(...scenes: BABYLON.Scene[]): void {
        this.scenes = scenes;
    }
}

const instance = new SceneLoader();
export default instance;