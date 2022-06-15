import * as GUI from 'babylonjs-gui';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {Control} from '../../../../../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectArtControl extends Control<GUI.Image> {
    constructor(private buildingObjectState: BuildingObjectState) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.Image('art', this.buildingObjectState.artUrl);
        this.control.width = '70px';
        this.control.height = '70px';
        this.control.top = '10%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
