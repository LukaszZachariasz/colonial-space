import {GameBuilder} from '../game-builder/game-builder';
import {GameGenerator} from '../../game-generator/game-generator';
import {LoadingScene} from '../../scenes/loading/loading.scene';
import {SpaceScene} from '../../scenes/space/space.scene';
import {filter, take, tap} from 'rxjs';
import {gameEngine, gamePlatform, sceneManager} from '../../core/game-platform';

export class LoadGame {
    private gameGenerator: GameGenerator = new GameGenerator();
    private gameBuilder: GameBuilder = new GameBuilder();

    constructor() {
        sceneManager().addScene(new LoadingScene());
    }

    public load(): void {
        sceneManager().navigateToScene(LoadingScene.SCENE_NAME);

        gameEngine().gameState = this.gameGenerator.generate();
        this.gameBuilder.build();


        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneManager().navigateToScene(SpaceScene.SCENE_NAME))
        ).subscribe();
    }
}