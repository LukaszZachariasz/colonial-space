import {GameScene} from './game-scene';

export class GameSceneLoader {
    public activeGameScene: GameScene;

    constructor() {
    }
}

const instance = new GameSceneLoader();
export default instance;
