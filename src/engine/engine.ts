import * as BABYLON from 'babylonjs';
import {GameLoad} from './game-load/game-load';
import {GameState} from './game-state/game-state';
import {GuiManager} from './gui-manager/gui-manager';
import {ScenarioLoader} from './scenario-loader/scenario-loader';
import {SceneManager} from './scene-manager/scene-manager';
import {Settings} from './settings/settings';
import {initialization} from '../scenarios/01-initialization/initialization';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public sceneManager: SceneManager = new SceneManager();
    public guiManager: GuiManager = new GuiManager();

    public gameState: GameState = new GameState();

    public gameLoad: GameLoad = new GameLoad();
    public scenarioLoader: ScenarioLoader = new ScenarioLoader();

    public settings: Settings = new Settings();

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;

        this.scenarioLoader.load(this.gameLoad.load(initialization));

        this.engine.runRenderLoop(() => {
            this.sceneManager.currentScene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}
