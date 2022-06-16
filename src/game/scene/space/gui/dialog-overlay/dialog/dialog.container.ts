import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class DialogContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control = new GUI.Container('dialog');

    @AppendControl() private body: GuiControl<GUI.Control>;

    constructor(body: GuiControl<GUI.Control>) {
        this.body = body;
    }

    public gameAfterCreated(): void {
        this.control.width = '30%';
        this.control.adaptHeightToChildren = true;
        this.control.background = 'rgba(0, 0, 0, 0.6)';
    }
}
