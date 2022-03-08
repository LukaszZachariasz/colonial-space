import {GameScene} from '../../game-scenes/game-scene';

export class SceneLoader {
    public scenes: GameScene[] = [];

    public setScenes(...scenes: GameScene[]): void {
        this.scenes.forEach((scene: GameScene) => scene?.gui.dispose());
        this.scenes = [...scenes];
        this.scenes.forEach((scene: GameScene) => scene?.gui.create(scene.scene));
    }
}

const instance = new SceneLoader();
export default instance;