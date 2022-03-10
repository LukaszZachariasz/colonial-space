import * as BABYLON from 'babylonjs';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GalaxyNameLabel} from './galaxy-name-label/galaxy-name-label';
import {GalaxyState} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-state';
import {GameSceneGui} from '../../game-scene-gui';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import guiManager from '../../../engine/gui-manager/gui-manager';

export class GalaxySceneGui implements GameSceneGui {
    constructor(private galaxyState: GalaxyState) {
    }

    public create(scene: BABYLON.Scene): void {
        guiManager.reset(scene);

        guiManager.create(new GalaxyNameLabel(this.galaxyState));
        guiManager.create(new CurrentTourBar());
        guiManager.create(new ResourceBar());
    }
}
