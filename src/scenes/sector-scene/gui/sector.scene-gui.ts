import {BackToPlanetButtonGuiObject} from './back-to-planet-button/back-to-planet-button.gui-object';
import {CurrentTourGuiContainer} from '../../../gui-objects/current-tour/current-tour.gui-container';
import {
    PlanetState
} from '../../../engine/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class SectorSceneGui extends SceneGui {
    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new BackToPlanetButtonGuiObject(this.planetState));
        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
