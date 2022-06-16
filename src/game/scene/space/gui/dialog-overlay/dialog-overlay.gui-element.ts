import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendGuiControl} from '../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {DialogGuiElement} from './dialog/dialog.gui-element';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogOverlayGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('dialogOverlay');

    @AppendGuiControl() public dialogGuiElement: DialogGuiElement = new DialogGuiElement(this.body);

    constructor(private body: GuiControl<GUI.Control>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;
    }
}
