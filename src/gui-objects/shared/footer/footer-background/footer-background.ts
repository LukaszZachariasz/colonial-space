import * as GUI from 'babylonjs-gui';
import {FooterGuiContainer} from '../footer.gui-container';
import {GuiContainer} from '../../../gui-container';

export class FooterBackground extends GuiContainer {
    public render(): GUI.Control {
        this.container = new GUI.Container('toolbarBackground');
        this.container.width = '90%';
        this.container.height = '50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;

        this.container.background = 'rgb(0, 0, 0)';
        this.container.alpha = FooterGuiContainer.FOOTER_OPACITY;
        return this.container;
    }
}