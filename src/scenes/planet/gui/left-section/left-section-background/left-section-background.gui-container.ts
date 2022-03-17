import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../../gui-objects/gui-container';

export class LeftSectionBackgroundGuiContainer extends GuiContainer {
    public render(): GUI.Control {
        this.container = new GUI.Container('leftSectionBackgroundContainer');
        this.container.width = '85%';
        this.container.height = '100%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.container.background = 'rgb(0, 0, 0)';
        this.container.alpha = 0.3;
        return this.container;
    }
}