import {GameScene} from "../../game-scenes/game-scene";

export class SceneLoader {
    public scenes: GameScene[] = [];

    public displayScene(scene: GameScene) {
        this.scenes.push(scene);
    }
}

const instance = new SceneLoader();
export default instance;