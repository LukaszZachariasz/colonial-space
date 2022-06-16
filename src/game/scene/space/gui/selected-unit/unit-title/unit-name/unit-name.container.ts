import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitNameContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('unitName');

    @AppendControl() public text: TextControl = new TextControl(this.unitState.name, {uppercase: true});

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.left = '60px';
        this.control.adaptWidthToChildren = true;
    }
}
