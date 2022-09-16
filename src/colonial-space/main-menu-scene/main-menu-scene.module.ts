import * as BABYLON from 'babylonjs';
import {MainMenuLight} from './light/main-menu.light';
import {MainMenuMusic} from './music/main-menu.music';
import {MainMenuPostEffects} from './post-effects/main-menu.post-effects';
import {MainMenuScene} from './main-menu.scene';
import {MainMenuSceneGui} from './gui/main-menu-scene-gui';
import {MainMenuShip} from './ship/main-menu.ship';
import {MainMenuSkybox} from './skybox/main-menu.skybox';
import {Module} from '@colonial-space/core/module/module';
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
                MainMenuShip,
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
