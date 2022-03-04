import {GameScene} from "../game-scene";
import * as BABYLON from "babylonjs";
import engine from "engine";
import {GameSceneCamera} from "../game-scene-camera";

export class PlanetScene extends GameScene implements GameSceneCamera<BABYLON.FreeCamera> {
    camera: BABYLON.FreeCamera;

    createCamera(): void {
        this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 3, -10), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(engine.canvas, true);
    }

    createScene(): void {
        this.createCamera();

        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 0.5;
        const sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, this.scene);
        sphere.position.y = 1;
        const ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, this.scene);
    }
}