import * as BABYLON from 'babylonjs';
import {GuiManager} from './gui-manager/gui-manager';
import {SceneManager} from './scene-manager/scene-manager';
import {Settings} from './settings/settings';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;

    public sceneManager: SceneManager = new SceneManager();
    public guiManager: GuiManager = new GuiManager();
    public settings: Settings = new Settings();

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;

        this.engine.runRenderLoop(() => {
            this.sceneManager.currentScene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
