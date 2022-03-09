import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GalaxyScene} from './galaxy-scene';
import {GalaxySceneGui} from './gui/galaxy-scene-gui';
import {GeneratedGalaxyDust} from '../../game-objects/galaxy/generated-galaxy-dust';
import {GeneratedGalaxyOrigin} from '../../game-objects/galaxy/generated-galaxy-origin';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';
import engine from 'engine';

export class GalaxySceneBuilder {
    public galaxyScene: GalaxyScene;

    constructor() {
        this.galaxyScene = new GalaxyScene();
    }

    public name(name: string): GalaxySceneBuilder {
        this.galaxyScene.name = name;
        return this;
    }

    public withLockedCamera(): GalaxySceneBuilder {
        this.galaxyScene.camera = new BABYLON.FreeCamera('camera', new BABYLON.Vector3(0, 50, -70), this.galaxyScene.scene);
        this.galaxyScene.camera.setTarget(BABYLON.Vector3.Zero());
        return this;
    }

    public withArcCamera(): GalaxySceneBuilder {
        this.galaxyScene.camera = new BABYLON.ArcRotateCamera('camera', 1, 0.8, 5, new BABYLON.Vector3(0, 0, 0), this.galaxyScene.scene);
        this.galaxyScene.camera.setTarget(new BABYLON.Vector3(-10, 0, 0));

        this.galaxyScene.camera.lowerRadiusLimit = 2.5;
        this.galaxyScene.camera.upperRadiusLimit = 100;
        this.galaxyScene.camera.pinchDeltaPercentage = 0.01;
        this.galaxyScene.camera.wheelDeltaPercentage = 0.01;
        this.galaxyScene.camera.panningSensibility = 0;

        this.galaxyScene.camera.attachControl(engine.canvas, true);
        return this;
    }

    public withSkybox(): GalaxySceneBuilder {
        this.galaxyScene.skybox = new SpaceSkybox();
        this.galaxyScene.skybox.create(this.galaxyScene.scene);
        return this;
    }

    public withGalaxyArea(galaxyArea: GalaxyArea): GalaxySceneBuilder {
        this.galaxyScene.galaxyAreas.push(galaxyArea);
        galaxyArea.create(this.galaxyScene.scene);
        return this;
    }

    public withLights(): GalaxySceneBuilder {
        const light = new BABYLON.HemisphericLight('galaxyLight', new BABYLON.Vector3(0, 1, 0), this.galaxyScene.scene);
        light.intensity = 1;
        return this;
    }

    public withGui(): GalaxySceneBuilder {
        this.galaxyScene.gui = new GalaxySceneGui(this.galaxyScene);
        return this;
    }

    public withGeneratedGalaxyOrigin(generatedGalaxyOrigin: GeneratedGalaxyOrigin): GalaxySceneBuilder {
        this.galaxyScene.generatedGalaxyOrigin = generatedGalaxyOrigin;
        generatedGalaxyOrigin.gui = this.galaxyScene.gui as GalaxySceneGui;
        generatedGalaxyOrigin.create(this.galaxyScene.scene);
        return this;
    }


    public build(): GalaxyScene {
        return this.galaxyScene;
    }

    public withGalaxyDust(generatedGalaxyDust: GeneratedGalaxyDust): GalaxySceneBuilder {
        this.galaxyScene.generatedGalaxyDust = generatedGalaxyDust;
        generatedGalaxyDust.create(this.galaxyScene.scene);
        return this;
    }
}
