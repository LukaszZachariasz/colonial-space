import * as BABYLON from "babylonjs";
import {GalaxyScene} from "./galaxy-scene";
import {SpaceSkybox} from "../../game-objects/skybox/space-skybox/space-skybox";

export class GalaxySceneBuilder {
    galaxyScene: GalaxyScene;

    constructor() {
        this.galaxyScene = new GalaxyScene();
    }

    withLockedCamera(): GalaxySceneBuilder {
        this.galaxyScene.camera = new BABYLON.FreeCamera("camera", new BABYLON.Vector3(0, 0, -1), this.galaxyScene.scene);
        this.galaxyScene.camera.setTarget(BABYLON.Vector3.Zero());
        return this;
    }

    withSkybox(): GalaxySceneBuilder {
        this.galaxyScene.skybox = new SpaceSkybox();
        this.galaxyScene.skybox.create(this.galaxyScene.scene);
        return this;
    }

    build(): GalaxyScene {
        return this.galaxyScene;
    }
}