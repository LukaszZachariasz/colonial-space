import {GameScene} from '../../game-scenes/game-scene';

export class SceneManager {
    public currentScene: GameScene;
    public allScenes: GameScene[] = [];

    public addScene(gameScene: GameScene): void {
        const exists = this.allScenes.find((el: GameScene) => gameScene.name === el.name);
        if (exists) {
            throw new Error(`Scene ${gameScene.name} already exists`);
        }
        this.allScenes.push(gameScene);
    }

    public navigateToScene(name: string): void {
        const scene = this.allScenes.find((gameScene: GameScene) => gameScene.name === name);
        if (!scene) {
            throw new Error(`Scene ${name} is not found. Can't navigate to unknown scene.`);
        }
        this.setCurrentScene(scene);
    }

    public setCurrentScene(gameScene: GameScene): void {
        if (this.currentScene) {
            this.currentScene.scene.detachControl();
        }
        this.currentScene = {...gameScene};
        this.currentScene.gui.create(this.currentScene.scene);

        this.currentScene.scene.attachControl();
    }
}
