import {GameScene} from '../../game-scenes/game-scene';
import {GameplayState} from '../game-state/gameplay-state/gameplay-state';
import {LoadGalaxyScene} from './load-galaxy-scene/load-galaxy-scene';
import {filter, take, tap} from 'rxjs';
import gameState from '../game-state/game-state';
import loadingSceneManager from '../../engine/loading-scene-manager/loading-scene-manager';
import sceneLoader from '../../engine/scene-loader/scene-loader';

export class GameLoader {
    public loadGalaxyScene: LoadGalaxyScene = new LoadGalaxyScene();

    public load(gameplayState: GameplayState): void {
        sceneLoader.setScenes(loadingSceneManager.loadingScene);

        gameState.gameplayState = gameplayState;
        this.loadGalaxyScene.loadGalaxyScene(gameState.gameplayState.galaxyState);

        loadingSceneManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneLoader.setScenes(gameState.gameScenes.find((el: GameScene) => el.name === gameState.gameplayState.initGameSceneName)))
        ).subscribe();
    }
}

const instance = new GameLoader();
export default instance;