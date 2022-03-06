import {Scenario} from '../../scenarios/scenario';
import sceneLoader from '../scene-loader/scene-loader';

export class GameState {
    public currentScenario: Scenario = null;

    public startScenario(scenario: Scenario): void {
        this.currentScenario = scenario;
        this.currentScenario.createScenario();
        sceneLoader.displayScene(this.currentScenario.initialScene);
    }
}

const instance = new GameState();
export default instance;