import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../engine/camera/from-above-camera';
import {GalaxyDust} from '../../game-objects/galaxy-dust/galaxy-dust';
import {Hex} from '../../game-objects/hex/hex';
import {Scene} from '../scene';
import {SpaceSceneGui} from './gui/space.scene-gui';
import {SpaceSkybox} from '../../game-objects/space-skybox/space-skybox';

export class SpaceScene extends Scene<FromAboveCamera, SpaceSceneGui> {
    public static readonly SCENE_NAME = 'space-scene';

    public name = SpaceScene.SCENE_NAME;

    public skybox: SpaceSkybox;
    public galaxyDust: GalaxyDust;
    public hexes: Hex[] = [];

    constructor() {
        super(true);
        new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);
    }
}
