import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../gui-objects/gui-container';
import {LeftSectionBackgroundGuiContainer} from './left-section-background/left-section-background.gui-container';
import {LeftSectionEdgeGuiObject} from './left-section-edge/left-section-edge.gui-object';

export class LeftSectionGuiContainer extends GuiContainer {
    public background: LeftSectionBackgroundGuiContainer;
    public edge: LeftSectionEdgeGuiObject;

    public render(): GUI.Control {
        this.container = new GUI.Container('leftSectionContainer');
        this.container.width = '30%';
        this.container.height = '70%';
        this.container.left = '5%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        this.background = new LeftSectionBackgroundGuiContainer();
        this.edge = new LeftSectionEdgeGuiObject();

        this.container.addControl(this.background.render());
        this.container.addControl(this.edge.render());

        return this.container;
    }
}
