import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/gui-elements/container';
import {Control} from '../../../../../engine/gui-manager/gui-elements/control';
import {DialogContainer} from './dialog/dialog.container';

export class DialogOverlayContainer extends Container {
    public dialogContainer: DialogContainer;

    constructor(private body: Control<GUI.Control>) {
        super('dialogOverlay');
    }

    public onCreate(): void {
        super.onCreate();
        this.dialogContainer = new DialogContainer(this.body);
    }

    public onBuild(): void {
        this.addControlToContainer(this.dialogContainer);
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '100%';
        this.control.isPointerBlocker = true;
    }
}
