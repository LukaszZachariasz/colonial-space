import {GameScene} from '../game-scenes/game-scene';

export interface Scenario {
    get initialScene(): GameScene;

    createScenario(): void;
}