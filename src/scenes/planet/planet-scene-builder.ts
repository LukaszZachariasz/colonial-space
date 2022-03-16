import * as BABYLON from 'babylonjs';
import {Planet} from '../../game-objects/planet/planet';
import {PlanetScene} from './planet.scene';
import {PlanetSceneGui} from './gui/planet.scene-gui';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';
import {gameEngine} from '../../core/game-platform';

export class PlanetSceneBuilder {
    public planetScene: PlanetScene;

    constructor() {
        this.planetScene = new PlanetScene();
    }

    public name(name: string): PlanetSceneBuilder {
        this.planetScene.name = name;
        return this;
    }

    public withArcCamera(planetSize: number): PlanetSceneBuilder {
        this.planetScene.camera = new BABYLON.ArcRotateCamera('camera', 1, 1, planetSize + 3, new BABYLON.Vector3(-(planetSize / 2), 0, 0), this.planetScene.scene);

        this.planetScene.camera.lowerRadiusLimit = planetSize + 1;
        this.planetScene.camera.upperRadiusLimit = planetSize + 10;
        this.planetScene.camera.pinchDeltaPercentage = 0.01;
        this.planetScene.camera.wheelDeltaPercentage = 0.01;
        this.planetScene.camera.panningSensibility = 0;

        this.planetScene.camera.attachControl(gameEngine().canvas, true);
        return this;
    }

    public withSkyBox(): PlanetSceneBuilder {
        this.planetScene.skybox = new SpaceSkybox();
        this.planetScene.skybox.create(this.planetScene.scene);
        return this;
    }

    public withPlanet(planet: Planet): PlanetSceneBuilder {
        this.planetScene.planet = planet;
        this.planetScene.planet.create(this.planetScene.scene);
        return this;
    }

    public withLights(): PlanetSceneBuilder {
        const light = new BABYLON.HemisphericLight('planetLight', new BABYLON.Vector3(0, 1, 0), this.planetScene.scene);
        light.intensity = 1;
        return this;
    }

    public withGui(): PlanetSceneBuilder {
        this.planetScene.gui = new PlanetSceneGui();
        return this;
    }

    public build(): PlanetScene {
        return this.planetScene;
    }
}
