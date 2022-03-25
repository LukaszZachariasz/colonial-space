import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from './camera/from-above-camera';
import {GalaxyDustModel} from './model/galaxy-dust/galaxy-dust.model';
import {SpaceGui} from './gui/space.gui';
import {SpaceScene} from './space.scene';
import {SpaceSkybox} from './skybox/space/space.skybox';
import {SquareModel} from './model/square/square.model';
import {TerritoryModel} from './model/territory/territory.model';
import {UnitModel} from './model/unit/unit.model';

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

    public addSquare(square: SquareModel): SpaceSceneBuilder {
        this.spaceScene.squares.push(square);
        square.create(this.spaceScene.scene);
        return this;
    }

    public addTerritory(territory: TerritoryModel): SpaceSceneBuilder {
        this.spaceScene.territories.push(territory);
        territory.create(this.spaceScene.scene);
        return this;
    }

    public addUnit(unit: UnitModel): SpaceSceneBuilder {
        this.spaceScene.units.push(unit);
        unit.create(this.spaceScene.scene);
        return this;
    }

    public skybox(skybox: SpaceSkybox): SpaceSceneBuilder {
        this.spaceScene.skybox = skybox;
        this.spaceScene.skybox.create(this.spaceScene.scene);
        return this;
    }

    public galaxyDust(): SpaceSceneBuilder {
        this.spaceScene.galaxyDust = new GalaxyDustModel();
        this.spaceScene.galaxyDust.create(this.spaceScene.scene);
        return this;
    }

    public gui(): SpaceSceneBuilder {
        this.spaceScene.gui = new SpaceGui();
        return this;
    }

    public build(): SpaceScene {
        return this.spaceScene;
    }
}
