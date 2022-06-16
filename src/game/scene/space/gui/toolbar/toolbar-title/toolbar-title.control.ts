import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class ToolbarTitleControl implements GuiControl<GUI.Image>, AfterCreated {
    public control = new GUI.Image('main', 'resources/gui/toolbar/main.png');

    public gameAfterCreated(): void {
        this.control.width = '25%';
        this.control.height = '50px';
        this.control.top = '10px';
        this.control.alpha = 0.4;
    }
}
