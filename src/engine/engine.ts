import * as BABYLON from 'babylonjs';
import {GameLogic} from '../game-logic/game-logic';
import {GameState} from '../game-state/game.state';
import {GuiManager} from './gui-manager/gui-manager';
import {LoadGame} from './load-game/load-game';
import {SceneManager} from './scene-manager/scene-manager';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public sceneManager: SceneManager;
    public guiManager: GuiManager;
    public loadGame: LoadGame;
    public gameState: GameState;
    public gameLogic: GameLogic;

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.createServices();
        this.startListeners();

        this.loadGame.load();
    }

    private startListeners(): void {
        this.engine.runRenderLoop(() => {
            this.sceneManager?.currentScene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }

    private createServices(): void {
        this.sceneManager = new SceneManager();
        this.guiManager = new GuiManager();
        this.loadGame = new LoadGame();
        this.gameState = new GameState();
        this.gameLogic = new GameLogic();
    }
}
