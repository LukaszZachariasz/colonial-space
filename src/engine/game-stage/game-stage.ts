import {GameState} from '../../game-core/game-state/game-state';
import {PostTourEffect} from '../../game-core/tour/post-tour-effect';
import {Scenario} from '../../scenarios/scenario';
import {filter, take, tap} from 'rxjs';
import loadingSceneManager from '../loading-scene-manager/loading-scene-manager';
import sceneLoader from '../scene-loader/scene-loader';

export class GameStage {
    public currentScenario: Scenario = null;
    public gameState: GameState = null;

    public startScenario(scenario: Scenario): void {
        sceneLoader.setScenes(loadingSceneManager.loadingScene);

        this.gameState = new GameState();
        this.currentScenario = scenario;
        this.currentScenario.createScenario();

        this.gameState.tour.addPostTourEffect(new PostTourEffect(100, () => this.gameState.resource.addWood(100))); // TODO: Temporary testing tour post effects

        loadingSceneManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneLoader.setScenes(this.currentScenario.initialScene))
        ).subscribe();
    }
}

const instance = new GameStage();
export default instance;