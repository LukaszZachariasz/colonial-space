import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {DialogContainer} from './dialog/dialog.container';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogOverlayContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('dialogOverlay');

    @AppendControl() public dialogContainer: DialogContainer = new DialogContainer(this.body);

    constructor(private body: GuiControl<GUI.Control>) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;
    }
}
