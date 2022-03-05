import {GameScene} from "../game-scene";
import * as BABYLON from "babylonjs";
import engine from "engine";
import {GameSceneCamera} from "../game-scene-camera";
import {Planet} from "../../game-objects/planet/planet";
import {SpaceSkybox} from "../../game-objects/skybox/space-skybox/space-skybox";

export class PlanetScene extends GameScene implements GameSceneCamera<BABYLON.ArcRotateCamera> {
    camera: BABYLON.ArcRotateCamera;

    skybox: SpaceSkybox;
    planet: Planet;

    createCamera(): void {
        this.camera = new BABYLON.ArcRotateCamera("camera", -Math.PI/2, Math.PI/4, 3, new BABYLON.Vector3(0, 0, -1), this.scene);
        this.camera.setTarget(BABYLON.Vector3.Zero());
        this.camera.attachControl(engine.canvas, true);
        new BABYLON.FxaaPostProcess("fxaa", 1.0, this.camera);
    }

    createScene(): void {
        this.createCamera();
        this.planet = new Planet();
        this.skybox = new SpaceSkybox();

        this.planet.create(this.scene);
        this.skybox.create(this.scene);

        const light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), this.scene);
        light.intensity = 1;
    }
}