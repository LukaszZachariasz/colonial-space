import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../../../engine/gui-manager/control';
import {TextControl} from '../../../../shared/text/text.control';
import {logic} from '../../../../../../../game';
import {selectUnitById} from '../../../../../../../logic/store/unit/unit.selectors';

export class SelectedUnitNameControl extends Control {
    public text: TextControl;

    public render(): GUI.Control {
        const unit = selectUnitById(logic().selectedUnitService.selectedUnit$.value.unitId);

        this.text = new TextControl(unit.name);
        this.text.textBlock.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.textBlock.left = '60px';

        return this.text.render();
    }

}
