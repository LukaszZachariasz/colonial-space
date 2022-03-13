import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {LoadGalaxyScene} from './load-galaxy-scene/load-galaxy-scene';
import {LoadingScene} from '../../scenes/loading/loading.scene';
import {filter, take, tap} from 'rxjs';
import {gamePlatform, gameState, gameplayState, sceneManager} from '../../core/game-platform';

export class ScenarioLoader {
    public loadGalaxyScene: LoadGalaxyScene = new LoadGalaxyScene();

    public load(scenario: () => GameplayState): void {
        sceneManager().setCurrentScene(new LoadingScene());
        gameState().initialize();
        gameState().gameplayState = scenario();

        this.loadGalaxyScene.loadGalaxyScene(gameplayState().galaxyState);

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => gamePlatform().engine.sceneManager.navigateToScene(gameplayState().initGameSceneName))
        ).subscribe();
    }
}
