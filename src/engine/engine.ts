import * as BABYLON from 'babylonjs';
import {gameEngine} from '../core/game-platform';
import {Game} from '../game/game';
import {GuiManager} from './gui-manager/gui-manager';
import {SceneManager} from './scene-manager/scene-manager';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public sceneManager: SceneManager;
    public guiManager: GuiManager;
    public game: Game;

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.sceneManager = new SceneManager();
        this.guiManager = new GuiManager();

        this.game = new Game();
        this.game.generate();
        this.game.start();

        this.engine.runRenderLoop(() => {
            this.sceneManager?.scene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

export const sceneManager = (): SceneManager => gameEngine().sceneManager;
export const guiManager = (): GuiManager => gameEngine().guiManager;
export const game = (): Game => gameEngine().game;

