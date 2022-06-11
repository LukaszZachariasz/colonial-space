import {GameBuilder} from './game-builder/game-builder';
import {LoadingScene} from '../loading/scenes/loading-scene/loading.scene';
import {Logic} from './logic/logic';
import {SpaceScene} from './scene/space/space.scene';
import {StoreGenerator} from './logic/store-generator/store.generator';
import {WelcomeStackPanel} from './scene/space/gui/dialogs/welcome/welcome.stack-panel';
import {filter, take, tap} from 'rxjs';
import {game, sceneManager} from 'engine';
import {gamePlatform} from '../core/game-platform';

export class Game {
    public logic: Logic;
    
    public storeGenerator: StoreGenerator = new StoreGenerator();
    public gameBuilder: GameBuilder = new GameBuilder();
    
    public generate(): void {
        sceneManager().navigateToScene(LoadingScene.SCENE_NAME);
        this.logic = new Logic();
        this.logic.storeGenerator.generate();
    }

    public start(): void {
        this.gameBuilder.build();

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneManager().navigateToScene(SpaceScene.SCENE_NAME)),
            tap(() => logic().dialogService.open$.next(new WelcomeStackPanel()))
        ).subscribe();
    }
}

export const logic = (): Logic => game().logic;
