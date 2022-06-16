import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendControl
} from '../../../../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../../../../shared/text/text.control';

@GuiElement()
export class BuildingObjectNameContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('buildingObjectName');
    
    @AppendControl() private textControl: TextControl = new TextControl(this.buildingObjectState.name.toString());

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.textControl.control.left = '5%';
    }
}
