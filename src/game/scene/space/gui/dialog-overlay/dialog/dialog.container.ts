import * as GUI from 'babylonjs-gui';
import {Container} from '../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogContainer extends Container {
    constructor(private body: Control<GUI.Control>) {
        super('dialog');
    }

    public onCreate(): void {
        super.onCreate();
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';

        this.addControlToContainer(this.body);
    }
}
