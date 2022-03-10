import * as BABYLON from 'babylonjs';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import guiManager from '../../../engine/gui-manager/gui-manager';

export class SectorSceneGui implements GameSceneGui {
    public create(scene: BABYLON.Scene): void {
        guiManager.reset(scene);

        guiManager.create(new CurrentTourBar());
        guiManager.create(new ResourceBar());
    }
}