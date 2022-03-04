import * as BABYLON from 'babylonjs';

export class Engine {
    public _canvas: HTMLCanvasElement;
    public _engine: BABYLON.Engine;
    public _scene: BABYLON.Scene;


    initialize(canvas: HTMLCanvasElement) {
        this._engine = new BABYLON.Engine(canvas, true);
        this._canvas = canvas;
        this._scene = new BABYLON.Scene(this._engine);


        this._engine.runRenderLoop(() => {
            this._scene.render();
        });

        window.addEventListener('resize', () => {
            this._engine.resize();
        });
    }
}

const instance = new Engine();
export default instance;
