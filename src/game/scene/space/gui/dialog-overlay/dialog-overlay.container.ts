import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../engine/lifecycle/after-created/after-created';
import {DialogContainer} from './dialog/dialog.container';
import {GuiContainer} from '../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiControl} from '../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogOverlayContainer extends GuiContainer implements AfterCreated {
    public dialogContainer: DialogContainer;

    constructor(private body: GuiControl<GUI.Control>) {
        super('dialogOverlay');
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;

        this.dialogContainer = new DialogContainer(this.body);
        this.addControlToContainer(this.dialogContainer);
    }
}
