import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogContainer extends GuiContainer implements AfterCreated {
    constructor(private body: GuiControl<GUI.Control>) {
        super('dialog');
    }

    public gameAfterCreated(): void {
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';

        this.addControlToContainer(this.body);
    }
}
