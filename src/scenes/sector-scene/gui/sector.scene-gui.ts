import {BackToPlanetButtonGuiObject} from './back-to-planet-button/back-to-planet-button.gui-object';
import {CurrentTourGuiContainer} from '../../../gui-objects/current-tour/current-tour.gui-container';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class SectorSceneGui extends SceneGui {
    constructor() {
        super();
    }

    public render(): void {
        this.guiManager.render(new BackToPlanetButtonGuiObject());
        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
