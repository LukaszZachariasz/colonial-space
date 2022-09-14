import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../core/lifecycle/after-created/after-created';
import {GuiControl} from '../../../../../../core/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../core/gui-manager/gui-elements/gui-element';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

@GuiElement()
export class TerritoryArtGuiElement implements GuiControl<GUI.Image>, AfterCreated {
    public control = new GUI.Image('art', this.territoryState.artUrl);

    constructor(private territoryState: TerritoryState) {
    }

    public gameAfterCreated(): void {
        this.control.width = '150px';
        this.control.height = '150px';
        this.control.top = '60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
