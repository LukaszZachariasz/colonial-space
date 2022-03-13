import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {LoadGalaxyScene} from './load-galaxy-scene/load-galaxy-scene';
import {LoadingScene} from '../../scenes/loading/loading.scene';
import {filter, take, tap} from 'rxjs';
import {gamePlatform} from '../../core/game-platform';
import gameState from '../game-state/game-state';

export class GameLoader {
    public loadGalaxyScene: LoadGalaxyScene = new LoadGalaxyScene();

    public load(gameplayState: GameplayState): void {
        gamePlatform().engine.sceneManager.setCurrentScene(new LoadingScene());

        gameState.gameplayState = gameplayState;
        this.loadGalaxyScene.loadGalaxyScene(gameState.gameplayState.galaxyState);

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => gamePlatform().engine.sceneManager.navigateToScene(gameState.gameplayState.initGameSceneName))
        ).subscribe();
    }
}

const instance = new GameLoader();
export default instance;
