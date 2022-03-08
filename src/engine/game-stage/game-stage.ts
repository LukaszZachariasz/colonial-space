import {Scenario} from '../../scenarios/scenario';
import {filter, take, tap} from 'rxjs';
import loadingSceneManager from '../loading-scene-manager/loading-scene-manager';
import sceneLoader from '../scene-loader/scene-loader';

export class GameStage {
    public currentScenario: Scenario = null;

    public startScenario(scenario: Scenario): void {
        sceneLoader.setScenes(loadingSceneManager.loadingScene);
        this.currentScenario = scenario;
        this.currentScenario.createScenario();

        loadingSceneManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneLoader.setScenes(this.currentScenario.initialScene))
        ).subscribe();
    }
}

const instance = new GameStage();
export default instance;