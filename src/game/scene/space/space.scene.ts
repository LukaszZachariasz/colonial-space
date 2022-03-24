import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from './camera/from-above-camera';
import {GalaxyDustModel} from './model/galaxy-dust/galaxy-dust.model';
import {Scene} from '../scene';
import {SpaceGui} from './gui/space.gui';
import {SpaceSkybox} from './skybox/space/space.skybox';
import {SquareModel} from './model/square/square.model';
import {TerritoryModel} from './model/territory/territory.model';
import {UnitModel} from './model/unit/unit.model';

export class SpaceScene extends Scene<FromAboveCamera, SpaceGui> {
    public static readonly SCENE_NAME = 'space-scene';

    public name = SpaceScene.SCENE_NAME;

    public skybox: SpaceSkybox;
    public galaxyDust: GalaxyDustModel;
    public squares: SquareModel[] = [];
    public territories: TerritoryModel[] = [];
    public units: UnitModel[] = [];

    constructor() {
        super(true);
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);
    }
}
