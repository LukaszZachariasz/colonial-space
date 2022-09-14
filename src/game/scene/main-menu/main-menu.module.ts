import * as BABYLON from 'babylonjs';
import {MainMenuScene} from './main-menu.scene';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {Module} from '@colonial-space/core/module/module';

@Module({
    scenes: [
        {
            name: 'main-menu',
            scene: MainMenuScene,
            gui: MainMenuSceneGui,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new BABYLON.ArcRotateCamera('Camera', 5.5, 1, 2, BABYLON.Vector3.Zero(), scene),
            root: true
        }
    ]
})
export class MainMenuModule {
}
