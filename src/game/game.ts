import {LoadingScene} from './scene/loading/loading.scene';
import {Logic} from './logic/logic';
import {SceneBuilder} from './scene-builder/scene-builder';
import {SpaceScene} from './scene/space/space.scene';
import {Store} from './store/store';
import {StoreGenerator} from './store-generator/store.generator';
import {filter, take, tap} from 'rxjs';
import {game, sceneManager} from 'engine';
import {gamePlatform} from '../core/game-platform';

export class Game {
    public store: Store;
    public logic: Logic;
    
    public storeGenerator: StoreGenerator = new StoreGenerator();
    public sceneBuilder: SceneBuilder = new SceneBuilder();
    
    public generate(): void {
        sceneManager().addScene(new LoadingScene());
        sceneManager().navigateToScene(LoadingScene.SCENE_NAME);
        this.store = this.storeGenerator.generate();
        this.logic = new Logic();
    }

    public start(): void {
        this.sceneBuilder.build();

        gamePlatform().loadingManager.isLoading$.pipe(
            filter((isLoading: boolean) => isLoading === false),
            take(1),
            tap(() => sceneManager().navigateToScene(SpaceScene.SCENE_NAME))
        ).subscribe();
    }
}


export const store = (): Store => game().store;
export const logic = (): Logic => game().logic;
