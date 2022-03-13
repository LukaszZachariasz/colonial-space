import {BackToGalaxyButtonGuiObject} from './back-to-galaxy-button/back-to-galaxy-button.gui-object';
import {CurrentTourBarGuiContainer} from '../../../gui-objects/current-tour/current-tour-bar.gui-container';
import {ResourceGuiContainer} from '../../../gui-objects/resource/resource.gui-container';
import {SceneGui} from '../../scene-gui';

export class PlanetSceneGui extends SceneGui {
    public render(): void {
        this.guiManager.render(new BackToGalaxyButtonGuiObject());
        this.guiManager.render(new CurrentTourBarGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());
    }
}
