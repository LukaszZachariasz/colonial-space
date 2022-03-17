import {Scene} from '../../scenes/scene';
import {guiManager} from '../../core/game-platform';

export class SceneManager {
    public currentScene: Scene;
    public allScenes: Scene[] = [];

    public addScene(gameScene: Scene): void {
        this.allScenes.push(gameScene);
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
