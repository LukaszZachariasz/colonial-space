import * as BABYLON from 'babylonjs';
import {BackToPlanetButton} from './back-to-planet-button/back-to-planet-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {
    PlanetState
} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import {gamePlatform} from '../../../core/game-platform';

export class SectorSceneGui implements GameSceneGui {

    constructor(private planetState: PlanetState) {
    }

    public create(scene: BABYLON.Scene): void {
        gamePlatform().engine.guiManager.reset(scene);

        gamePlatform().engine.guiManager.create(new BackToPlanetButton(this.planetState));
        gamePlatform().engine.guiManager.create(new CurrentTourBar());
        gamePlatform().engine.guiManager.create(new ResourceBar());
    }
}
