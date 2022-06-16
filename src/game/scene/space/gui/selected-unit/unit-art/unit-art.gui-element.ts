import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../engine/lifecycle/after-created/after-created';
import {GuiControl} from '../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {UnitState} from '../../../../../logic/store/unit/unit.state';

@GuiElement()
export class UnitArtGuiElement implements GuiControl<GUI.Image>, AfterCreated {
    public control = new GUI.Image('art', this.unitState.artUrl);

    constructor(private unitState: UnitState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '100%';
        this.control.height = '70%';
        this.control.top = '10px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
