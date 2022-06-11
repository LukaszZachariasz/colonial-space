import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/container';
import {Control} from '../../../../../../engine/gui-manager/control';

export class DialogContainer extends Container {
    constructor(private body: Control<GUI.Control>) {
        super('dialog');
    }

    public onBuild(): void {
        this.addControlToContainer(this.body);
    }

    public onApplyStyles(): void {
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }
}
