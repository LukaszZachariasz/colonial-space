import {GameScene} from './game-scene';

export class GameSceneLoader {
    public gameScenes: GameScene[] = [];

    public loadScene(scene: GameScene) {
        this.gameScenes.push(scene);
    }
}

const instance = new GameSceneLoader();
export default instance;
