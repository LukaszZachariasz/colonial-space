import {GameScene} from '../../game-scenes/game-scene';

export class SceneLoader {
    public currentScene: GameScene;

    public loadScene(gameScene: GameScene): void {
        this.currentScene = gameScene;
        this.currentScene.gui.create(gameScene.scene);
    }
}

const instance = new SceneLoader();
export default instance;