import * as BABYLON from 'babylonjs';
import {MainMenuLight} from './arrangement/light/main-menu.light';
import {MainMenuMusic} from './arrangement/music/main-menu.music';
import {MainMenuPostEffects} from './arrangement/post-effects/main-menu.post-effects';
import {MainMenuScene} from './main-menu.scene';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {MainMenuSkybox} from './arrangement/skybox/main-menu.skybox';
import {Module} from '@colonial-space/core/module/module.decorator';
import {Routes} from '../core/routing/routing.enum';

@Module({
    scenes: [
        {
            name: Routes.MainMenuScene,
            scene: MainMenuScene,
            gui: MainMenuSceneGui,
            cameraFactory: (scene: BABYLON.Scene): BABYLON.Camera => new BABYLON.ArcRotateCamera('Camera', 5.5, 1, 2, BABYLON.Vector3.Zero(), scene),
            root: true,
            arrangement: [
                MainMenuSkybox,
                MainMenuLight,
                MainMenuMusic,
                MainMenuPostEffects
            ]
        }
    ]
})
export class MainMenuSceneModule {
}
