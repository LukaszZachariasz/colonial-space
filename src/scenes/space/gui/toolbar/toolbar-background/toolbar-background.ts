import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../gui-container';
import {ToolbarGuiContainer} from '../toolbar.gui-container';

export class ToolbarBackground extends GuiContainer {
    public render(): GUI.Control {
        this.container = new GUI.Container('toolbarBackground');
        this.container.width = '90%';
        this.container.height = '50px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;

        this.container.background = 'rgb(0, 0, 0)';
        this.container.alpha = ToolbarGuiContainer.TOOLBAR_OPACITY;
        return this.container;
    }

}