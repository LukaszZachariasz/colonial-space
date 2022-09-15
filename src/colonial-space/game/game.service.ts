import {EMPTY, delay, of, tap} from 'rxjs';
import {GameBuilderService} from './game-builder/game-builder.service';
import {GameGeneratorService} from './game-generator/game-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneRouter} from '@colonial-space/core/scene-manager/router/scene-router';

@Injectable()
export class GameService {
    @Inject(SceneRouter) private sceneRouter: SceneRouter;
    @Inject(GameBuilderService) private gameBuilderService: GameBuilderService;
    @Inject(GameGeneratorService) private gameGeneratorService: GameGeneratorService;
    @Inject(SCENE('space')) private spaceScene: BABYLON.Scene;

    public newGame(): void {
        of(EMPTY).pipe(
            tap(() => this.sceneRouter.navigate('loading')),
            delay(0),
            tap(() => this.gameGeneratorService.generate()),
            tap(() => this.gameBuilderService.build()),
            tap(() => this.sceneRouter.navigate('space'))
        ).subscribe();
    }
}
