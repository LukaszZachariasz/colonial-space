import * as BABYLON from 'babylonjs';
import {AfterCreated} from '../../../engine/lifecycle/after-created/after-created';
import {FromAboveCamera} from './camera/from-above-camera';
import {GalaxyDustModel} from './model/galaxy-dust/galaxy-dust.model';
import {GameScene} from '../../../engine/scene-manager/game-scene';
import {Scene} from '../../../engine/scene-manager/scene';
import {SpaceGui} from './gui/space.gui';
import {SpaceSkybox} from './model/skybox/space/space.skybox';
import {modelManager} from 'engine';

@GameScene({
    name: 'SpaceScene',
    registerInLoadingManager: true
})
export class SpaceScene extends Scene<FromAboveCamera, SpaceGui> implements AfterCreated {
    public gui: SpaceGui = new SpaceGui();
    public camera = new FromAboveCamera('FromAboveCamera', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), this.scene);

    public gameAfterCreated(): void {
        this.camera.attachControl();
        modelManager().addModel(new SpaceSkybox(this.scene));
        modelManager().addModel(new GalaxyDustModel(this.scene));

        const light = new BABYLON.HemisphericLight('light', new BABYLON.Vector3(20, 0, -30), this.scene);
        light.intensity = 0.1;

        // TODO: improve visual effects
    }
}
