import * as BABYLON from 'babylonjs';
import {GalaxyArea} from '../../game-objects/galaxy-area/galaxy-area';
import {GalaxyOrigin} from '../../game-objects/galaxy-origin/galaxy-origin';
import {GalaxyScene} from './galaxy-scene';
import {GalaxySceneGui} from './gui/galaxy-scene-gui';
import {SpaceSkybox} from '../../game-objects/skybox/space-skybox/space-skybox';

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

    public withSkybox(): GalaxySceneBuilder {
        this.galaxyScene.skybox = new SpaceSkybox();
        this.galaxyScene.skybox.create(this.galaxyScene.scene);
        return this;
    }

    public withGalaxyOrigin(galaxyOrigin: GalaxyOrigin): GalaxySceneBuilder {
        this.galaxyScene.galaxyOrigin = galaxyOrigin;
        galaxyOrigin.create(this.galaxyScene.scene);
        galaxyOrigin.galaxyScene = this.galaxyScene;
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

    public build(): GalaxyScene {
        return this.galaxyScene;
    }
}