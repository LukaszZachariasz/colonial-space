import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {logic} from '../../../../../../../game';
import {selectUnitById} from '../../../../../../../logic/store/unit/unit.selectors';

export class SelectedUnitNameControl extends Control {
    public text: GUI.TextBlock;

    public render(): GUI.Control {
        this.text = new GUI.TextBlock('name', 'Awareness: 0');
        this.text.resizeToFit = true;
        this.text.color = 'white';
        this.text.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;

        const unit = selectUnitById(logic().selectedUnitService.selectedUnit$.value.unitId);
        this.text.text = unit.name;

        return this.text;
    }

}
