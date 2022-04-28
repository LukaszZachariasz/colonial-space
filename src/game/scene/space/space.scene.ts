import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from './camera/from-above-camera';
import {GalaxyDustModel} from './model/galaxy-dust/galaxy-dust.model';
import {Scene} from '../../../engine/scene-manager/scene';
import {SpaceGui} from './gui/space.gui';
import {SpaceSkybox} from './model/skybox/space/space.skybox';
import {selectMapSkybox} from '../../logic/store/map/tour.selectors';

export class SpaceScene extends Scene<FromAboveCamera, SpaceGui> {
    public static readonly SCENE_NAME = 'SpaceScene';
    public name = SpaceScene.SCENE_NAME;

    constructor() {
        super(true);
        this.setUpCamera();
        this.setUpSkybox();
        this.setUpGui();
        new GalaxyDustModel(this.scene); // todo: get rid of it?

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);
        light.intensity = 0.1;

        // TODO: improve visual effects
    }

    private setUpCamera(): void {
        this.camera = new FromAboveCamera('FromAboveCamera', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), this.scene);
        this.camera.attachControl();
    }

    private setUpSkybox(): void {
        new SpaceSkybox(this.scene, selectMapSkybox());
    }

    private setUpGui(): void {
        this.gui = new SpaceGui();
    }
}
