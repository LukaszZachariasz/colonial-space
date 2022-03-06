import * as BABYLON from 'babylonjs';
import {Planet} from '../../game-objects/planet/planet';
import {PlanetScene} from './planet-scene';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';
import engine from 'engine';

export class PlanetSceneBuilder {
    public planetScene: PlanetScene;

    constructor() {
        this.planetScene = new PlanetScene();
    }

    public withArcCamera(): PlanetSceneBuilder {
        this.planetScene.camera = new BABYLON.ArcRotateCamera('camera', -Math.PI/2, Math.PI/4, 3, new BABYLON.Vector3(0, 0, -1), this.planetScene.scene);
        this.planetScene.camera.setTarget(BABYLON.Vector3.Zero());
        this.planetScene.camera.attachControl(engine.canvas, true);
        return this;
    }

    public withSkyBox(): PlanetSceneBuilder {
        this.planetScene.skybox = new SpaceSkybox();
        this.planetScene.skybox.create(this.planetScene.scene);
        return this;
    }

    public withPlanet(): PlanetSceneBuilder {
        this.planetScene.planet = new Planet();
        this.planetScene.planet.create(this.planetScene.scene);
        return this;
    }

    public withLights(): PlanetSceneBuilder {
        const light = new BABYLON.HemisphericLight('planetLight', new BABYLON.Vector3(0, 1, 0), this.planetScene.scene);
        light.intensity = 1;
        return this;
    }

    public build(): PlanetScene {
        return this.planetScene;
    }
}