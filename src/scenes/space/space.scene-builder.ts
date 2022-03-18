import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera';
import {GalaxyDust} from '../../game-objects/galaxy-dust/galaxy-dust';
import {Hex} from '../../game-objects/hex/hex';
import {SpaceScene} from './space.scene';
import {SpaceSceneGui} from './gui/space.scene-gui';
import {SpaceSkybox} from '../../game-objects/space-skybox/space-skybox';

export class SpaceSceneBuilder {
    public spaceScene: SpaceScene;

    constructor() {
        this.spaceScene = new SpaceScene();
    }

    public camera(): SpaceSceneBuilder {
        this.spaceScene.camera = new FromAboveCamera('spaceCamera2', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), this.spaceScene.scene);
        this.spaceScene.camera.attachControl();
        return this;
    }

    public addHex(hex: Hex): SpaceSceneBuilder {
        this.spaceScene.hexes.push(hex);
        hex.create(this.spaceScene.scene);
        return this;
    }

    public skybox(skybox: SpaceSkybox): SpaceSceneBuilder {
        this.spaceScene.skybox = skybox;
        this.spaceScene.skybox.create(this.spaceScene.scene);
        return this;
    }

    public galaxyDust(): SpaceSceneBuilder {
        this.spaceScene.galaxyDust = new GalaxyDust();
        this.spaceScene.galaxyDust.create(this.spaceScene.scene);
        return this;
    }

    public gui(): SpaceSceneBuilder {
        this.spaceScene.gui = new SpaceSceneGui();
        return this;
    }

    public build(): SpaceScene {
        return this.spaceScene;
    }
}
