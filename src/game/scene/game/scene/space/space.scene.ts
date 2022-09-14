import * as BABYLON from 'babylonjs';
import {Container} from 'typedi';
import {FromAboveCamera} from './camera/from-above-camera';
import {GalaxyDustModel} from './model/galaxy-dust/galaxy-dust.model';
import {ModelManagerService} from '../../../../core/model-manager/model-manager.service';
import {OnInit} from '@colonial-space/core/lifecycle/on-init/on-init';
import {SpaceGui} from './gui/space.gui';
import {SpaceSkybox} from './model/skybox/space/space.skybox';
import {selectMapSkybox} from '../../logic/store/map/tour.selectors';

export class SpaceScene implements OnInit {
    public gui: SpaceGui = new SpaceGui();
    public camera = new FromAboveCamera('FromAboveCamera', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), this.scene);

    public gameOnInit(): void {
        this.camera.attachControl();
        Container.get(ModelManagerService).addSimpleModel(new SpaceSkybox(this.scene, selectMapSkybox()));
        Container.get(ModelManagerService).addSimpleModel(new GalaxyDustModel(this.scene));

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);
        light.intensity = 0.1;

        // TODO: improve visual effects
    }
}
