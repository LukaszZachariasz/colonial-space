import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';

export class DialogContainer extends Container {
    constructor(private body: GUI.Control) {
        super();
    }

    public render(): GUI.Control {
        this.container = new GUI.Container('dialog');
        this.container.width = '30%';
        this.container.adaptHeightToChildren = true;
        this.container.background = 'rgba(0, 0, 0, 0.6)';

        this.container.addControl(this.body);

        return this.container;
    }
}
