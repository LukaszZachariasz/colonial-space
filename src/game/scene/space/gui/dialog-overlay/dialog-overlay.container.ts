import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../engine/gui-manager/container';
import {DialogContainer} from './dialog/dialog.container';

export class DialogOverlayContainer extends Container {
    constructor(private body: GUI.Control) {
        super();
    }
    
    public render(): GUI.Control {
        this.container = new GUI.Container('dialogOverlay');
        this.container.width = '100%';
        this.container.height = '100%';
        this.container.isPointerBlocker = true;

        this.container.addControl(new DialogContainer(this.body).render());

        return this.container;
    }
}
