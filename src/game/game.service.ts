import * as BABYLON from 'babylonjs';
import {CANVAS_ELEMENT} from '@colonial-space/core/canvas-element/canvas-element';
import {Game} from './game/game';
import {Inject} from '@colonial-space/core/injector/inject';
import {Injectable} from '@colonial-space/core/injector/injectable';
import {LoadingScene} from './loading/loading.scene';
import {MainMenuScene} from './main-menu/main-menu-scene';
import {OnReady} from '@colonial-space/core/lifecycle/on-ready/on-ready';
import {SceneManagerService} from './core/scene-manager/scene-manager.service';

@Injectable()
export class GameService implements OnReady {
    public engine: BABYLON.Engine;

    public loadingScene: LoadingScene;
    public mainMenuScene: MainMenuScene;

    @Inject(CANVAS_ELEMENT) private canvasElement: HTMLCanvasElement;
    @Inject(SceneManagerService) private sceneManagerService: SceneManagerService;

    constructor(private game: Game) {
    }

    public gameOnReady(): void {
        this.engine = new BABYLON.Engine(this.canvasElement, true);

        this.loadingScene = this.sceneManagerService.register(new LoadingScene());
        this.mainMenuScene = this.sceneManagerService.register(new MainMenuScene());
        this.sceneManagerService.navigateToScene('MainMenuScene');

        this.engine.runRenderLoop(() => {
            this.sceneManagerService?.scene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    public newGame(): void {
        this.game.generate();
        this.game.start();
    }
}
