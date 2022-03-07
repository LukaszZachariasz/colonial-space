import * as BABYLON from 'babylonjs';
import {LoadingScene} from './loading-scene/loading-scene';
import debug from './debug/debug';
import loadingSceneManager from './loading-scene/loading-scene-manager';
import sceneLoader from './scene-loader/scene-loader';

export class Engine {
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;

    public initialize(canvas: HTMLCanvasElement): void {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;
        loadingSceneManager.loadingScene = new LoadingScene();
        debug.debug();

        this.engine.runRenderLoop(() => {

            sceneLoader.scenes.forEach((scene: BABYLON.Scene) => {
                scene.render();
            });
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
