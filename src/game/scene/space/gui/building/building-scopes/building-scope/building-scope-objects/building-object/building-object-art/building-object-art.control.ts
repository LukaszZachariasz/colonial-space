import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../../../../engine/lifecycle/after-created/after-created';
import {
    BuildingObjectState
} from '../../../../../../../../../logic/store/building/building-scope/building-object/building-object.state';
import {GuiControl} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../../../../engine/gui-manager/gui-elements/gui-element';

@GuiElement()
export class BuildingObjectArtControl implements GuiControl<GUI.Image>, AfterCreated {
    public control = new GUI.Image('art', this.buildingObjectState.artUrl);

    constructor(private buildingObjectState: BuildingObjectState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '70px';
        this.control.height = '70px';
        this.control.top = '10%';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
