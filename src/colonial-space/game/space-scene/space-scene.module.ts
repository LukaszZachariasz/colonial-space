import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {GalaxyDust} from './arrangement/galaxy-dust/galaxy-dust';
import {Module} from '@colonial-space/core/module/module';
import {RemoveFogOfWarHandlerService} from './services/fog-of-war/remove-fog-of-war-handler.service';
import {SpaceGui} from './gui/space.gui';
import {SpaceLight} from './arrangement/light/space.light';
import {SpaceScene} from './space.scene';
import {SpaceSceneBuilderService} from './services/space-scene-builder/space-scene-builder.service';
import {SpaceSceneSkybox} from './arrangement/skybox/space-scene.skybox';
import {TerritoryFactoryService} from './services/space-scene-builder/territory-factory/territory-factory.service';
import {UnitFactoryService} from './services/space-scene-builder/unit-factory/unit-factory.service';

@Module({
    scenes: [
        {
            name: 'space',
            scene: SpaceScene,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new FromAboveCamera('Camera', -Math.PI / 2, 0.5, 20, new BABYLON.Vector3(20, 0, -30), scene),
            gui: SpaceGui,
            lazy: true,
            arrangement: [
                SpaceSceneSkybox,
                SpaceLight,
                GalaxyDust
            ],
            providers: [
                SpaceSceneBuilderService,
                TerritoryFactoryService,
                UnitFactoryService,
                RemoveFogOfWarHandlerService
            ]
        }
    ]
})
export class SpaceSceneModule {
}
