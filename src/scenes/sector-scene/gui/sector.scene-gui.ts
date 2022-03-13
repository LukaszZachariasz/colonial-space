import {BackToPlanetButtonGuiObject} from './back-to-planet-button/back-to-planet-button.gui-object';
import {CurrentTourBarGuiContainer} from '../../../gui-objects/current-tour/current-tour-bar.gui-container';
import {
    PlanetState
} from '../../../game-core/game-state/gameplay-state/galaxy-state/galaxy-area-state/planet-state/planet-state';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class SectorSceneGui extends SceneGui {
    constructor(private planetState: PlanetState) {
        super();
    }

    public render(): void {
        this.guiManager.render(new BackToPlanetButtonGuiObject(this.planetState));
        this.guiManager.render(new CurrentTourBarGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
