import * as GUI from 'babylonjs-gui';
import {AfterCreated} from '../../../../../../../engine/lifecycle/after-created/after-created';
import {AppendControl} from '../../../../../../../engine/gui-manager/gui-elements/append-control/append-control';
import {GuiControl} from '../../../../../../../engine/gui-manager/gui-elements/gui-control';
import {GuiElement} from '../../../../../../../engine/gui-manager/gui-elements/gui-element';
import {TerritoryState} from '../../../../../../logic/store/territory/territory.state';
import {TextControl} from '../../../shared/text/text.control';

@GuiElement()
export class TerritoryNameContainer implements GuiControl<GUI.Container>, AfterCreated {
    public control: GUI.Container = new GUI.Container('territoryName');

    @AppendControl() public text: TextControl = new TextControl(this.territoryState.name);

    constructor(private territoryState: TerritoryState) {
    }

    public gameAfterCreated(): void {
        this.text.control.horizontalAlignment = GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
        this.text.control.left = '60px';
    }
}
