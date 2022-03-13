import * as BABYLON from 'babylonjs';
import {Settings} from './settings/settings';
import sceneLoader from './scene-loader/scene-loader';

export class Engine {
    public engine: BABYLON.Engine;
    public canvas: HTMLCanvasElement;
    public settings: Settings = new Settings();

    public initialize(canvas: HTMLCanvasElement): void {
        this.canvas = canvas;
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;

        this.engine.runRenderLoop(() => {
            sceneLoader.currentScene.scene.render();
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
