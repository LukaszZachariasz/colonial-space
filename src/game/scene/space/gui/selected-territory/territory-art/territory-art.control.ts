import * as GUI from 'babylonjs-gui';
import {Control} from '../../../../../../engine/gui-manager/gui-elements/elements/control';
import {GuiElement} from '../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TerritoryState} from '../../../../../logic/store/territory/territory.state';

@GuiElement()
export class TerritoryArtControl extends Control<GUI.Image> {
    constructor(private territoryState: TerritoryState) {
        super();
    }

    public onCreate(): void {
        this.control = new GUI.Image('art', this.territoryState.artUrl);
        this.control.width = '150px';
        this.control.height = '150px';
        this.control.top = '60px';
        this.control.verticalAlignment = GUI.Control.VERTICAL_ALIGNMENT_TOP;
    }
}
