import {BackToGalaxyButtonGuiObject} from './back-to-galaxy-button/back-to-galaxy-button.gui-object';
import {CurrentTourGuiContainer} from '../../../gui-objects/current-tour/current-tour.gui-container';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class PlanetSceneGui extends SceneGui {
    public render(): void {
        this.guiManager.render(new BackToGalaxyButtonGuiObject());
        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
