import {FooterBackground} from '../../../gui-objects/shared/footer/footer-background/footer-background';
import {LeftSectionGuiContainer} from './left-section/left-section.gui-container';
import {
    NavigateBackButtonGuiObject
} from '../../../gui-objects/shared/navigate-back-button/navigate-back-button.gui-object';
import {RightSectionGuiContainer} from './right-section/right-section.gui-container';
import {SceneGui} from '../../scene-gui';
import {ToolbarGuiContainer} from '../../../gui-objects/shared/toolbar/toolbar.gui-container';

export class PlanetSceneGui extends SceneGui {
    public render(): void {
        this.guiManager.render(new ToolbarGuiContainer());
        this.guiManager.render(new FooterBackground());

        this.guiManager.render(new LeftSectionGuiContainer());
        this.guiManager.render(new RightSectionGuiContainer());

        this.guiManager.render(new NavigateBackButtonGuiObject('Galaxy view'));
/*        this.guiManager.render(new CurrentTourGuiContainer());
        this.guiManager.render(new ResourceGuiContainer());*/

        // this.guiManager.render(new SectorsGuiContainer());
    }
}
