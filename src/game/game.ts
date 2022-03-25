import {GameInstance} from '../core/game/game-instance';
import {LoadingScene} from './scene/loading/loading.scene';
import {SceneBuilder} from './scene-builder/scene-builder';
import {SelectionGuiService} from './logic/selection/gui/selection-gui.service';
import {SelectionService} from './logic/selection/selection.service';
import {SpaceScene} from './scene/space/space.scene';
import {SquareService} from './logic/square/square.service';
import {Store} from './store/store';
import {StoreGenerator} from './store-generator/store.generator';
import {TourEffectService} from './logic/tour/tour-effect/tour-effect.service';
import {TourService} from './logic/tour/tour.service';
import {UnitMovementService} from './logic/unit/unit-movement.service';
import {filter, take, tap} from 'rxjs';
import {game, sceneManager} from 'engine';
import {gamePlatform} from '../core/game-platform';

@GameInstance({
    loadingScene: LoadingScene,
    logic: [
        SelectionService,
        SelectionGuiService,
        SquareService,
        TourService,
        TourEffectService,
        UnitMovementService
    ]
})
export class Game {
    public store: Store;

    public storeGenerator: StoreGenerator = new StoreGenerator();
    public sceneBuilder: SceneBuilder = new SceneBuilder();
    
    public generate(): void {
        this.store = this.storeGenerator.generate();
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
