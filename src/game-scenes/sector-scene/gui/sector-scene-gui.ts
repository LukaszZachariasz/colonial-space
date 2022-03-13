import {BackToPlanetButton} from './back-to-planet-button/back-to-planet-button';
import {CurrentTourBar} from '../../../gui-objects/current-tour-bar/current-tour-bar';
import {GameSceneGui} from '../../game-scene-gui';
import {
    PlanetState
} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceBar} from '../../../gui-objects/resource-bar/resource-bar';

export class SectorSceneGui extends GameSceneGui {
    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new BackToPlanetButton(this.planetState));
        this.guiManager.render(new CurrentTourBar());
        this.guiManager.render(new ResourceBar());
    }
}
