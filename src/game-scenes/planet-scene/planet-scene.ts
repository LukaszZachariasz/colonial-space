import {GameScene} from "../game-scene";
import * as BABYLON from "babylonjs";
import engine from "engine";
import {GameSceneCamera} from "../game-scene-camera";
import {Planet} from "../../game-objects/planet/planet";

export class PlanetScene extends GameScene implements GameSceneCamera<BABYLON.ArcRotateCamera> {
    camera: BABYLON.ArcRotateCamera;

    planet: Planet;

    createCamera(): void {
        this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/4, 3, new BABYLON.Vector3(0, 0, -1), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(engine.canvas, true);
    }

    createScene(): void {
        this.createCamera();
        this.planet = new Planet();
        this.planet.create(this.scene);

        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 1;
    }
}