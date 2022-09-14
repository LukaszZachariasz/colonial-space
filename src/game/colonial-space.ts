import {Game} from './game/game';
import {GameEntry} from '@colonial-space/core/game-entry/game-entry';
import {Inject} from '@colonial-space/core/injector/inject';
import {LoadingScene} from './loading/loading.scene';
import {MainMenuScene} from './main-menu/main-menu-scene';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SceneManagerService} from './core/scene-manager/scene-manager.service';

@GameEntry()
export class ColonialSpace implements OnReady {
    public loadingScene: LoadingScene;
    public mainMenuScene: MainMenuScene;

    @Inject(SceneManagerService) private sceneManagerService: SceneManagerService;

    constructor(private game: Game) {
    }

    public gameOnReady(): void {
        this.loadingScene = this.sceneManagerService.register(new LoadingScene());
        this.mainMenuScene = this.sceneManagerService.register(new MainMenuScene());
        this.sceneManagerService.navigateToScene('MainMenuScene');
    }

    public newGame(): void {
        this.game.generate();
        this.game.start();
    }
}
