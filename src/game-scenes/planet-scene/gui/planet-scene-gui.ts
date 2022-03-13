import * as BABYLON from 'babylonjs';
import {BackToGalaxyButton} from './back-to-galaxy-button/back-to-galaxy-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import {gamePlatform} from '../../../core/game-platform';

export class PlanetSceneGui implements GameSceneGui {
    public create(scene: BABYLON.Scene): void {
        gamePlatform().engine.guiManager.reset(scene);

        gamePlatform().engine.guiManager.create(new BackToGalaxyButton());
        gamePlatform().engine.guiManager.create(new CurrentTourBar());
        gamePlatform().engine.guiManager.create(new ResourceBar());
    }
}
