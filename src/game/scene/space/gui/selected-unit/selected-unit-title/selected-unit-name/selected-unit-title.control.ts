import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../../engine/gui-manager/control';
import {TextControl} from '../../../shared/text/text.control';
import {UnitState} from '../../../../../../logic/store/unit/unit.state';

export class SelectedUnitNameControl extends Control {
    public text: TextControl;

    constructor(private unitState: UnitState) {
        super();
    }

    public render(): GUI.Control {
        this.text = new TextControl(this.unitState.name, {
            uppercase: true
        });
        this.text.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.textBlock.left = '60px';

        return this.text.render();
    }
}
