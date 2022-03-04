import * as BABYLON from 'babylonjs';
import gameSceneLoader from "../game-scenes/game-scene-loader";

export class Engine {
    public canvas: HTMLCanvasElement;
    public engine: BABYLON.Engine;

    initialize(canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas, true);
        this.canvas = canvas;

        this.engine.runRenderLoop(() => {
            gameSceneLoader.gameScenes.forEach(gameScene => gameScene.scene.render());
        });

        window.addEventListener('resize', () => {
            this.engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
