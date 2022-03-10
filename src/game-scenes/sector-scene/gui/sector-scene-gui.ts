import * as BABYLON from 'babylonjs';
import {BackToPlanetButton} from './back-to-planet-button/back-to-planet-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {
    PlanetState
} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import guiManager from '../../../engine/gui-manager/gui-manager';

export class SectorSceneGui implements GameSceneGui {

    constructor(private planetState: PlanetState) {
    }

    public create(scene: BABYLON.Scene): void {
        guiManager.reset(scene);

        guiManager.create(new BackToPlanetButton(this.planetState));
        guiManager.create(new CurrentTourBar());
        guiManager.create(new ResourceBar());
    }
}