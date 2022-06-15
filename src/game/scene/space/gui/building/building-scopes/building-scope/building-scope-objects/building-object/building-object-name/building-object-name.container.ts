import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Container} from '../../../../../../../../../../engine/gui-manager/gui-elements/elements/container/container';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TextControl} from '../../../../../../shared/text/text.control';

@GuiElement()
export class BuildingObjectNameContainer extends Container {
    private textControl: TextControl;

    constructor(private buildingObjectState: BuildingObjectState) {
        super('buildingObjectName');
    }

    public onCreate(): void {
        super.onCreate();
        this.textControl = new TextControl(this.buildingObjectState.name.toString());
        this.textControl.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
        this.textControl.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.textControl.control.left = '5%';
        this.addControlToContainer(this.textControl);
    }
}
