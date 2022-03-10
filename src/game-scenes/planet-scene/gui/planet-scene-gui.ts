import * as BABYLON from 'babylonjs';
import {BackToGalaxyButton} from './back-to-galaxy-button/back-to-galaxy-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import guiManager from '../../../engine/gui-manager/gui-manager';

export class PlanetSceneGui implements GameSceneGui {
    public create(scene: BABYLON.Scene): void {
        guiManager.reset(scene);

        guiManager.create(new BackToGalaxyButton());
        guiManager.create(new CurrentTourBar());
        guiManager.create(new ResourceBar());
    }
}