import * as BABYLON from 'babylonjs';
import {Game} from '../game/game';
import {GuiManager} from './gui-manager/gui-manager';
import {Loading} from '../loading/loading';
import {MainMenu} from '../main-menu/main-menu';
import {ModelManager} from './model-manager/model-manager';
import {SceneManager} from './scene-manager/scene-manager';
import {gameEngine} from '../core/game-platform';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public sceneManager: SceneManager;
    public guiManager: GuiManager;
    public modelManager: ModelManager;
    public game: Game;
    public mainMenu: MainMenu;
    public loading: Loading;

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.sceneManager = new SceneManager();
        this.guiManager = new GuiManager();
        this.modelManager = new ModelManager();

        this.loading = new Loading();
        this.loading.register();

        this.mainMenu = new MainMenu();
        this.mainMenu.start();

        this.engine.runRenderLoop(() => {
            this.sceneManager?.scene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    public newGame(): void {
        this.game = new Game();
        this.game.generate();
        this.game.start();
    }
}

export const sceneManager = (): SceneManager => gameEngine().sceneManager;
export const guiManager = (): GuiManager => gameEngine().guiManager;
export const modelManager = (): ModelManager => gameEngine().modelManager;
export const game = (): Game => gameEngine().game;

