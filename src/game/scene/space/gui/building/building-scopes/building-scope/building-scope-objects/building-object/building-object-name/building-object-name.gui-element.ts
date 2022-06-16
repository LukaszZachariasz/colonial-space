import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    AppendGuiControl
} from '../../../../../../../../../../engine/gui-manager/gui-elements/append-gui-control/append-gui-control';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextGuiElement} from '../../../../../../shared/text/text.gui-element';

@GuiElement()
export class BuildingObjectNameGuiElement implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('buildingObjectName');
    
    @AppendGuiControl() private text: TextGuiElement = new TextGuiElement(this.buildingObjectState.name.toString());

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.text.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '5%';
    }
}
