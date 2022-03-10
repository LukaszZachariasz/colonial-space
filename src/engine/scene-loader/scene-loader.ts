import {GameScene} from '../../game-scenes/game-scene';

export class SceneLoader {
    public currentScene: GameScene;

    public loadScene(gameScene: GameScene): void {
        if (this.currentScene) {
            this.currentScene.scene.detachControl();
        }
        this.currentScene = {...gameScene};
        this.currentScene.gui.create(this.currentScene.scene);

        this.currentScene.scene.attachControl();
    }
}

const instance = new SceneLoader();
export default instance;