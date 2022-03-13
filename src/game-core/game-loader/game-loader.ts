import {GameScene} from '../../game-scenes/game-scene';
import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {LoadGalaxyScene} from './load-galaxy-scene/load-galaxy-scene';
import {LoadingScene} from '../../game-scenes/loading-scene/loading-scene';
import {filter, take, tap} from 'rxjs';
import {gamePlatform} from '../../core/game-platform';
import gameState from '../game-state/game-state';
import sceneLoader from '../../engine/scene-loader/scene-loader';

export class GameLoader {
    public loadGalaxyScene: LoadGalaxyScene = new LoadGalaxyScene();

    public load(gameplayState: GameplayState): void {
        sceneLoader.loadScene(new LoadingScene());

        gameState.gameplayState = gameplayState;
        this.loadGalaxyScene.loadGalaxyScene(gameState.gameplayState.galaxyState);

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneLoader.loadScene(gameState.gameScenes.find((el: GameScene) => el.name === gameState.gameplayState.initGameSceneName)))
        ).subscribe();
    }
}

const instance = new GameLoader();
export default instance;
