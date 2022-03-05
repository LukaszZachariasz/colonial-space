import * as BABYLON from 'babylonjs';
import engine from "engine";

export abstract class GameScene {
    scene: BABYLON.Scene;

    constructor() {
        this.scene = new BABYLON.Scene(engine.engine);
    }
}
