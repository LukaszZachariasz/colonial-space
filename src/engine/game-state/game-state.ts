import {Scenario} from "../../scenarios/scenario";
import sceneLoader from "../scene-loader/scene-loader";

export class GameState {
    public currentScenario: Scenario = null;

    startScenario(scenario: Scenario) {
        this.currentScenario = scenario;
        this.currentScenario.createScenario();

        sceneLoader.displayScene(this.currentScenario.planetScene);
    }
}

const instance = new GameState();
export default instance;