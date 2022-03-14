import {GalaxySceneCreator} from '../../scenes/galaxy/galaxy-scene-creator';
import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {LoadingScene} from '../../scenes/loading/loading.scene';
import {SceneRoute} from '../scene-manager/scene-route';
import {filter, take, tap} from 'rxjs';
import {gamePlatform, gameState, gameplayState, sceneManager} from '../../core/game-platform';

export class ScenarioLoader {
    public galaxySceneCreator: GalaxySceneCreator = new GalaxySceneCreator();

    public load(scenario: GameplayState): void {
        sceneManager().addScene(new SceneRoute('loading-scene'), new LoadingScene());
        sceneManager().navigateToScene('loading-scene');
        gameState().gameplayState = scenario;

        this.galaxySceneCreator.create(gameplayState().galaxy, SceneRoute.ROOT_ROUTE);

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneManager().navigateToScene(gameplayState().route))
        ).subscribe();
    }
}
