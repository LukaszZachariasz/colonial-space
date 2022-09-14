import * as BABYLON from 'babylonjs';
import {MainMenuScene} from '../main-menu/main-menu.scene';
import {Module} from '@colonial-space/core/module/module';

@Module({
    scenes: [
        {
            name: 'main-menu',
            scene: MainMenuScene,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new BABYLON.ArcRotateCamera('Camera', 5.5, 1, 2, BABYLON.Vector3.Zero(), scene)
        }
    ]
})
export class LoadingModule {}
