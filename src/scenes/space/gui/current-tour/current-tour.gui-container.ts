import * as GUI from 'babylonjs-gui';
import {CurrentTourLabelGuiObject} from './current-tour-label/current-tour-label.gui-object';
import {GuiContainer} from '../gui-container';
import {NextTourButtonGuiObject} from './next-tour-button/next-tour-button.gui-object';

export class CurrentTourGuiContainer extends GuiContainer {
    public render(): GUI.Control {
        this.container = new GUI.Container('currentTourBar');
        this.container.width = '200px';
        this.container.height = '150px';
        this.container.top = '-60px';
        this.container.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_BOTTOM;
        this.container.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_RIGHT;

        this.container.addControl(new NextTourButtonGuiObject().render());
        this.container.addControl(new CurrentTourLabelGuiObject().render());

        return this.container;
    }
}
