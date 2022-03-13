import {BackToPlanetButton} from './back-to-planet-button/back-to-planet-button';
import {CurrentTourBar} from '../../../game-objects-gui/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {
    PlanetState
} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceBar} from '../../../game-objects-gui/resource-bar/resource-bar';
import {gamePlatform} from '../../../core/game-platform';

export class SectorSceneGui extends GameSceneGui {
    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): void {
        gamePlatform().engine.guiManager.render(new BackToPlanetButton(this.planetState));
        gamePlatform().engine.guiManager.render(new CurrentTourBar());
        gamePlatform().engine.guiManager.render(new ResourceBar());
    }
}
