import * as BABYLON from 'babylonjs';
import {LoadingGui} from './gui/loading.gui';
import {LoadingScene} from './loading.scene';
import {LoadingSkybox} from './arrangement/skybox/loading.skybox';
import {Module} from '@colonial-space/core/module/module.decorator';
import {Routes} from '../core/routing/routing.enum';

@Module({
    scenes: [
        {
            name: Routes.LoadingScene,
            scene: LoadingScene,
            gui: LoadingGui,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new BABYLON.ArcRotateCamera('Camera', 5.5, 1, 2, BABYLON.Vector3.Zero(), scene),
            arrangement: [
                LoadingSkybox
            ]
        }
    ]
})
export class LoadingSceneModule {}
