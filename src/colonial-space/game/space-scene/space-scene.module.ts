import * as BABYLON from 'babylonjs';
import {Routes} from '../../core/routing/routing.enum';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {GalaxyDust} from './galaxy-dust/galaxy-dust';
import {Module} from '@colonial-space/core/module/module';
import {SpaceGui} from './gui/space.gui';
import {SpaceLight} from './light/space.light';
import {SpaceScene} from './space.scene';
import {SpaceSceneSkybox} from './skybox/space-scene.skybox';

@Module({
    scenes: [
        {
            name: 'space',
            scene: SpaceScene,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new FromAboveCamera('Camera', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), scene),
            gui: SpaceGui,
            arrangement: [
                SpaceSceneSkybox,
                SpaceLight,
                GalaxyDust
            ]
        }
    ]
})
export class SpaceSceneModule {
}
