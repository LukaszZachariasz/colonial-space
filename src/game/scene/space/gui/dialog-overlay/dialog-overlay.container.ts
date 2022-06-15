import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {Control} from '../../../../../engine/gui-manager/gui-elements/elements/control';
import {DialogContainer} from './dialog/dialog.container';
import {GuiElement} from '../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogOverlayContainer extends Container {
    public dialogContainer: DialogContainer;

    constructor(private body: Control<GUI.Control>) {
        super('dialogOverlay');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;

        this.dialogContainer = new DialogContainer(this.body);
        this.addControlToContainer(this.dialogContainer);
    }
}
