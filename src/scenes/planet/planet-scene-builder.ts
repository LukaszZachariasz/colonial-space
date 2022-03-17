import * as BABYLON from 'babylonjs';
import {Planet} from '../../game-objects/planet/planet';
import {PlanetScene} from './planet.scene';
import {PlanetSceneGui} from './gui/planet.scene-gui';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

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
        this.planetScene.camera = new BABYLON.ArcRotateCamera('camera', 1, 1, planetSize + 5, BABYLON.Vector3.Zero(), this.planetScene.scene);
        // this.planetScene.camera.useAutoRotationBehavior = true;

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
