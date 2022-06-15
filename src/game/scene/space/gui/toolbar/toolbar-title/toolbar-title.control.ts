import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ToolbarTitleControl extends Control<GUI.Image> {
    public onCreate(): void {
        this.control = new GUI.Image('main', 'resources/gui/toolbar/main.png');
        this.control.width = '25%';
        this.control.height = '50px';
        this.control.top = '10px';
        this.control.alpha = 0.4;
    }
}
