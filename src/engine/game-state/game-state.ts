import {Scenario} from '../../scenarios/scenario';
import {filter, take, tap} from 'rxjs';
import loadingSceneManager from '../loading-scene/loading-scene-manager';
import sceneLoader from '../scene-loader/scene-loader';

export class GameState {
    public currentScenario: Scenario = null;

    public startScenario(scenario: Scenario): void {
        sceneLoader.overrideScenes(loadingSceneManager.loadingScene.scene);
        this.currentScenario = scenario;
        this.currentScenario.createScenario();

        loadingSceneManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneLoader.overrideScenes(this.currentScenario.initialScene))
        ).subscribe();
    }
}

const instance = new GameState();
export default instance;