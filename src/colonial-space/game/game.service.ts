import {GameBuilderService} from './game-builder/game-builder.service';
import {GameGeneratorService} from './game-generator/game-generator.service';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {SCENE} from '@colonial-space/core/injector/tokens/scene/scene.token';
import {SceneManager} from '@colonial-space/core/scene-manager/scene-manager';
import {SceneRouter} from '@colonial-space/core/scene-manager/router/scene-router';

@Injectable()
export class GameService {
    @Inject(SceneRouter) private sceneRouter: SceneRouter;
    @Inject(SceneManager) private sceneManager: SceneManager;
    @Inject(GameBuilderService) private gameBuilderService: GameBuilderService;
    @Inject(GameGeneratorService) private gameGeneratorService: GameGeneratorService;
    @Inject(SCENE('space')) private spaceScene: BABYLON.Scene;

    public newGame(): void {
        this.sceneRouter.navigate('loading');
        this.gameGeneratorService.generate();
        this.gameBuilderService.build();
        this.sceneRouter.navigate('space');
    }
}
