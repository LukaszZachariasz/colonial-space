import * as GUI from 'babylonjs-gui';
import {GuiContainer} from '../../../../gui-objects/gui-container';


import {RightSectionBackgroundGuiContainer} from './right-section-background/right-section-background.gui-container';
import {RightSectionEdgeGuiObject} from './right-section-edge/right-section-edge.gui-object';

export class RightSectionGuiContainer extends GuiContainer {
    public background: RightSectionBackgroundGuiContainer;
    public edge: RightSectionEdgeGuiObject;

    public render(): GUI.Control {
        this.container = new GUI.Container('leftSectionContainer');
        this.container.width = '30%';
        this.container.height = '70%';
        this.container.left = '-5%';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.background = new RightSectionBackgroundGuiContainer();
        this.edge = new RightSectionEdgeGuiObject();

        this.container.addControl(this.background.render());
        this.container.addControl(this.edge.render());

        return this.container;
    }
}