import * as BABYLON from 'babylonjs';
import sceneLoader from "./scene-loader/scene-loader";

export class Engine {
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;

    initialize(canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;

        this.engine.runRenderLoop(() => {
            sceneLoader.scenes.forEach(scene => scene.scene.render());
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
