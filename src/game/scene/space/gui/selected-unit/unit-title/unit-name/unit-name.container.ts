import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {GuiContainer} from '../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitNameContainer extends GuiContainer implements AfterCreated {
    public text: TextControl;

    constructor(private unitState: UnitState) {
        super('unitName');
    }

    public gameAfterCreated(): void {
        this.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.control.left = '60px';
        this.control.adaptWidthToChildren = true;

        this.text = new TextControl(this.unitState.name, {uppercase: true});
        this.addControlToContainer(this.text);
    }
}
