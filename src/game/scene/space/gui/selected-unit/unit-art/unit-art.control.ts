import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/control';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

export class UnitArtControl extends Control<GUI.Image> {
    constructor(private unitState: UnitState) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.Image('art', this.unitState.artUrl);
    }

    public onApplyStyles(): void {
        this.control.width = '100%';
        this.control.height = '70%';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
