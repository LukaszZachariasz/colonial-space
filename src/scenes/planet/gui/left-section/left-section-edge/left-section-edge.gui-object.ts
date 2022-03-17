import * as GUI from 'babylonjs-gui';
import {GuiObject} from '../../../../../gui-objects/gui-object';

export class LeftSectionEdgeGuiObject extends GuiObject {
    public edge: GUI.Image;

    public render(): GUI.Control {
        this.edge = new GUI.Image('leftSectionEdge', 'resources/gui/planet/left-section/left-section-edge.png');
        this.edge.width = '15%';
        this.edge.alpha = 0.3;
        this.edge.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_CENTER;
        this.edge.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;
        return this.edge;
    }
}