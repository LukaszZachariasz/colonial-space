import {Scene} from '../../scenes/scene';
import {guiManager} from '../../core/game-platform';

export class SceneManager {
    public currentScene: Scene;
    public allScenes: Scene[] = [];

    public addScene(gameScene: Scene): void {
        const exists = this.allScenes.find((el: Scene) => gameScene.name === el.name);
        if (exists) {
            throw new Error(`Scene ${gameScene.name} already exists`);
        }
        this.allScenes.push(gameScene);
    }

    public navigateToScene(name: string): void {
        const scene = this.allScenes.find((gameScene: Scene) => gameScene.name === name);
        if (!scene) {
            throw new Error(`Scene ${name} is not found. Can't navigate to unknown scene.`);
        }
        this.setCurrentScene(scene);
    }

    public setCurrentScene(gameScene: Scene): void {
        if (this.currentScene) {
            this.currentScene.scene.detachControl();
        }
        this.currentScene = {...gameScene};
        guiManager().reset();

        this.currentScene.scene.attachControl();
    }
}
