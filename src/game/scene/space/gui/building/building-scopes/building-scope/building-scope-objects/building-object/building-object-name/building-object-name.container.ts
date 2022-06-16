import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiContainer} from '../../../../../../../../../../engine/gui-manager/gui-elements/advanced-controls/gui-container/gui-container';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../../../../shared/text/text.control';

@GuiElement()
export class BuildingObjectNameContainer extends GuiContainer implements AfterCreated {
    private textControl: TextControl;

    constructor(private buildingObjectState: BuildingObjectState) {
        super('buildingObjectName');
    }

    public gameAfterCreated(): void {
        this.textControl = new TextControl(this.buildingObjectState.name.toString());
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.textControl.control.left = '5%';
        this.addControlToContainer(this.textControl);
    }
}
