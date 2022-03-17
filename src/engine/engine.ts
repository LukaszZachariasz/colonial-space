import * as BABYLON from 'babylonjs';
import {GameGenerator} from '../game-generator/game-generator';
import {GameState} from '../game-state/game.state';
import {GuiManager} from './gui-manager/gui-manager';
import {SceneManager} from './scene-manager/scene-manager';
import {Settings} from './settings/settings';
import {SpaceScene} from '../scenes/space/space.scene';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public gameGenerator: GameGenerator = new GameGenerator();
    public gameState: GameState = new GameState();

    public sceneManager: SceneManager = new SceneManager();
    public guiManager: GuiManager = new GuiManager();

    public settings: Settings = new Settings();

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);

        this.gameState = this.gameGenerator.generate();

        this.sceneManager.addScene(new SpaceScene());
        this.sceneManager.setCurrentScene(this.sceneManager.allScenes[0]);


        this.engine.runRenderLoop(() => {
            this.sceneManager?.currentScene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}
