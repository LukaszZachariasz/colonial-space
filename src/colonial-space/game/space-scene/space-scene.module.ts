import * as BABYLON from 'babylonjs';
import {FromAboveCamera} from '../../shared/camera/from-above-camera';
import {Module} from '@colonial-space/core/module/module.decorator';
import {RemoveFogOfWarHandlerService} from './services/fog-of-war/remove-fog-of-war-handler.service';
import {SpaceGui} from './gui/space.gui';
import {SpaceScene} from './space.scene';
import {SpaceSceneBuilderService} from './services/space-scene-builder/space-scene-builder.service';
import {SpaceSceneLight} from './arrangement/light/space-scene.light';
import {SpaceSceneSkybox} from './arrangement/skybox/space-scene.skybox';
import {SpaceSceneUnitCreatorService} from './services/space-scene-builder/unit/space-scene-unit-creator.service';
import {TerritoryFactoryService} from './services/space-scene-builder/territory/territory-factory.service';
import {UnitFactoryService} from './services/space-scene-builder/unit/unit-factory.service';

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
                SpaceSceneLight
            ],
            providers: [
                SpaceSceneBuilderService,
                TerritoryFactoryService,
                UnitFactoryService,
                SpaceSceneUnitCreatorService,
                RemoveFogOfWarHandlerService
            ]
        }
    ]
})
export class SpaceSceneModule {
}
