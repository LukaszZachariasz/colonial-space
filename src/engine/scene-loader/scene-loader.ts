import {GameScene} from "../../game-scenes/game-scene";

export class SceneLoader {
    public scenes: GameScene[] = [];

    public displayScene(scene: GameScene) {
        this.scenes.push(scene);
    }

    public overrideScene(scene: GameScene) {
        this.scenes = [scene];
    }
}

const instance = new SceneLoader();
export default instance;