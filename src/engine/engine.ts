import * as BABYLON from 'babylonjs';
import debug from './debug/debug';
import loadingSceneManager from './loading-scene-manager/loading-scene-manager';
import sceneLoader from './scene-loader/scene-loader';

export class Engine {
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;

    public initialize(canvas: HTMLCanvasElement): void {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;
        loadingSceneManager.initialize();
        debug.debug();

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
