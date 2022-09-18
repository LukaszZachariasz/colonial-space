import {EMPTY, delay, of, tap} from 'rxjs';
import {GameGeneratorService} from './game-generator/game-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SceneRouter} from '@colonial-space/core/module/scene/scene-router';

@Injectable()
export class GameService {
    @Inject(SceneRouter) private sceneRouter: SceneRouter;
    @Inject(GameGeneratorService) private gameGeneratorService: GameGeneratorService;

    public newGame(): void {
        of(EMPTY).pipe(
            tap(() => this.sceneRouter.navigate('loading')),
            delay(0),
            tap(() => this.gameGeneratorService.generate()),
            tap(() => this.sceneRouter.navigate('space'))
        ).subscribe();
    }
}
